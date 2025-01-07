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
  messages = [
    { message: "Hello, I'm HelpMate! Ask me anything!", sentTime: "just now", sender: "helpmate", direction: "incoming" }
  ];
  inputValue = '';
  isTyping = false;
  API_KEY = "votre_api_key";
  discussionsHistory: any[] = [];
  userId = 1; // Remplacez ceci par la méthode de récupération de l'ID utilisateur appropriée

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDiscussions();
  }

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

  loadDiscussion(history: any): void {
    this.http.get<any[]>(`http://127.0.0.1:8000/api/discussions/messages/${history.id}`).subscribe(messages => {
      // Ajoutez l'attribut inert au conteneur principal lorsqu'une modale est ouverte
      document.querySelector('app-root')?.setAttribute('inert', 'true');
      
      const dialogRef = this.dialog.open(DiscussionModalComponent, {
        data: { messages }
      });

      dialogRef.afterClosed().subscribe(() => {
        // Supprimez l'attribut inert lorsque la modale est fermée
        document.querySelector('app-root')?.removeAttribute('inert');
      });
    }, error => {
      console.error('Error loading discussion:', error);
    });
  }

  handleSend(): void {
    if (!this.inputValue.trim()) return;
  
    const newMessage = {
      message: this.inputValue,
      direction: "outgoing",
      sender: "user",
      sentTime: new Date().toLocaleTimeString(),
      sent_at: this.formatDate(new Date()) // Convertir la date au bon format
    };
  
    this.messages = [...this.messages, newMessage];
    this.saveMessage(newMessage); // Enregistrer le message dans la table des messages
    this.inputValue = '';
    this.isTyping = true;
    this.processMessageToHelpMate(this.messages);
  }
  
  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Mois de 1 à 12
    const dd = String(date.getDate()).padStart(2, '0'); // Jour de 01 à 31
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
  
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  }
  

  processMessageToHelpMate(chatMessages: any[]): void {
    const apiMessages = chatMessages.map(msg => ({
      role: msg.sender === "HelpMate" ? "assistant" : "user",
      content: msg.message
    }));

    const systemMessage = {
      role: "system",
      content: `You are HelpMate, an intelligent virtual assistant designed to assist with daily life tasks.
      Your capabilities include:
      - Providing helpful, accurate, and concise answers to user questions.
      - Offering advice on productivity, organization, and time management.
      - Assisting with meal planning, recipes, and dietary recommendations.
      - Supporting learning and education by explaining complex topics in simple terms.
      - Giving entertainment suggestions like movies, series, and books.
      - Helping with minor technical troubleshooting and general knowledge queries.
      Respond in a polite and engaging tone while keeping the answers relevant and to the point.`,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    this.http.post<any>('https://api.openai.com/v1/chat/completions', apiRequestBody, {
      headers: {
        Authorization: `Bearer ${this.API_KEY}`,
        "Content-Type": "application/json",
      }
    }).subscribe({
      next: (data) => {
        const helpmateMessage = {
          message: data.choices[0]?.message?.content || "No response from HelpMate.",
          sender: "helpmate",
          direction: "incoming",
          sent_at: this.formatDate(new Date()) // Ajouter la date formatée
        };

        this.messages = [...chatMessages, helpmateMessage];
        this.saveMessage(helpmateMessage); // Enregistrer le message de HelpMate
        this.isTyping = false;
      },
      error: (error) => {
        console.error("Error:", error);
        const errorMessage = {
          message: "An error occurred. Please try again later.",
          sender: "helpmate",
          direction: "incoming",
          sent_at: this.formatDate(new Date()) // Ajouter la date formatée pour l'erreur
        };
        this.messages = [...chatMessages, errorMessage];
        this.saveMessage(errorMessage); // Enregistrer le message d'erreur
        this.isTyping = false;
      }
    });
  }

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

  addToHistory(discussion: string): void {
    this.discussionsHistory.push(discussion);
  }
}
