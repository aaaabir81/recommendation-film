import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../../components/message/message.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DiscussionModalComponent } from '../../discussion-modal/discussion-modal.component';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
  imports: [CommonModule, MessageComponent, FormsModule]
})
export class DiscussionComponent implements OnInit {
  messages = [{ message: "Hello, I'm CineChill! Ask me anything!", sentTime: "just now", sender: "CineChill", direction: "incoming" }];
  inputValue = '';
  isTyping = false;
  userId = 1;
  discussionsHistory: any[] = [];

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDiscussions();
  }

  // Récupère les discussions depuis l'API Laravel
  getDiscussions(): void {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/discussions/${this.userId}`).subscribe(
      data => {
        if (data.length === 0) {
          console.warn('No discussions found for this user.');
        }
        this.discussionsHistory = data;
      },
      error => {
        console.error('Error fetching discussions:', error);
      }
    );
  }

  // Charge une discussion spécifique et ouvre la modal
  loadDiscussion(history: any): void {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/discussions/messages/${history.id}`).subscribe(messages => {
      document.querySelector('app-root')?.setAttribute('inert', 'true');
      
      const dialogRef = this.dialog.open(DiscussionModalComponent, {
        data: { messages }
      });

      dialogRef.afterClosed().subscribe(() => {
        document.querySelector('app-root')?.removeAttribute('inert');
      });
    }, error => {
      console.error('Error loading discussion:', error);
    });
  }

  // Envoie un message et le traite avec l'API CineChill
  handleSend(): void {
    if (!this.inputValue.trim()) return;
  
    const newMessage = {
      message: this.inputValue,
      direction: "outgoing",
      sender: "user",
      sentTime: new Date().toLocaleTimeString(),
      sent_at: this.formatDate(new Date())
    };
    
    this.messages = [...this.messages, newMessage];
    this.saveMessage(newMessage); // Enregistrer le message dans la base de données
    this.inputValue = '';
    this.isTyping = true;
    this.processMessageToCineChill(this.messages);
  }
  
  // Formate la date dans un format standard
  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
  
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  }

  // Traite le message et l'envoie à l'API Laravel (qui le redirige vers OpenAI)
  processMessageToCineChill(chatMessages: any[]): void {
    const apiMessages = chatMessages.map(msg => ({
      role: msg.sender === "CineChill" ? "assistant" : "user",
      content: msg.message
    }));
  
    const systemMessage = { role: "system", content: `You are CineChill, an expert in movie recommendations. Your capabilities include: - Providing personalized movie suggestions based on user preferences. - Offering detailed information about movies, including genres, cast, and reviews. - Assisting users in finding movies similar to those they have enjoyed. - Recommending movies for various moods and occasions. - Keeping users updated on new releases and trending movies. Respond in a friendly and engaging tone while keeping your answers relevant and to the point.`, };
  
    const apiRequestBody = {
      messages: [systemMessage, ...apiMessages],
    };
  
    // Appel API Laravel pour traiter avec OpenAI
    this.http.post<any>('http://127.0.0.1:8000/api/CineChill-response', apiRequestBody).subscribe({
      next: (data) => {
        console.log("Réponse reçue :", data);  // Ajouter des logs pour vérifier la réponse
  
        const CineChillMessageContent = data.choices?.[0]?.message?.content || "No response from CineChill.";
        const CineChillMessage = {
          message: CineChillMessageContent,
          sender: "CineChill",
          direction: "incoming",
          sent_at: this.formatDate(new Date())
        };
  
        this.messages = [...chatMessages, CineChillMessage];
        this.saveMessage(CineChillMessage);
        this.isTyping = false;
      },
      error: (error) => {
        console.error("Error:", error);
        const errorMessage = {
          message: "An error occurred. Please try again later.",
          sender: "CineChill",
          direction: "incoming",
          sent_at: this.formatDate(new Date())
        };
        this.messages = [...chatMessages, errorMessage];
        this.saveMessage(errorMessage);
        this.isTyping = false;
      }
    });
  }
  

  // Sauvegarde du message dans la base de données
  saveMessage(message: any): void {
    const disc_id = this.discussionsHistory[this.discussionsHistory.length - 1]?.id || 0;
    if (!disc_id || disc_id === 0) {
        console.error('Error: Invalid discussion ID.');
        return;
    }

    const newMessage = {
        disc_id,
        sender: message.sender,
        message: message.message,
        sent_at: message.sent_at,
    };

    this.http.post<any>('http://127.0.0.1:8000/api/messages', newMessage).subscribe(
        data => {
            console.log('Message saved:', data);
        },
        error => {
            console.error('Error saving message:', error);
        }
    );
  }

  // Crée une nouvelle discussion
  saveDiscussion(): void {
    const newDiscussion = {
      user_id: this.userId,
      started_at: new Date()
    };
    this.http.post<any>('http://127.0.0.1:8000/api/discussions', newDiscussion).subscribe(data => {
      this.discussionsHistory.push(data);
      this.messages = [];
    }, error => {
      console.error('Error saving discussion:', error);
    });
  }

  // Ajoute une discussion à l'historique
  addToHistory(discussion: string): void {
    this.discussionsHistory.push(discussion);
  }
}
