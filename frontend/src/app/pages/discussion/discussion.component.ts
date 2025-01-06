import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../../components/message/message.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
  imports: [CommonModule,
    MessageComponent,
    FormsModule
  ]
})
export class DiscussionComponent {
  messages = [
    { message: "Hello, I'm HelpMate! Ask me anything!", sentTime: "just now", sender: "HelpMate" , direction: "incoming"}
  ];
  inputValue = '';
  isTyping = false;
  API_KEY = "votre_api_key";
  discussionsHistory = ["Discussion 1", "Discussion 2"];

  constructor(private http: HttpClient) {}

  handleSend() {
    if (!this.inputValue.trim()) return;

    const newMessage = { message: this.inputValue, direction: "outgoing", sender: "user" ,sentTime: new Date().toLocaleTimeString()};
    this.messages = [...this.messages, newMessage];
    this.inputValue = '';
    this.isTyping = true;
    this.processMessageToHelpMate(this.messages);

  }

  processMessageToHelpMate(chatMessages: any[]) {
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
        this.messages = [
          ...chatMessages,
          { message: data.choices[0]?.message?.content || "No response from HelpMate.", sender: "HelpMate" , direction: "incoming"},
        ];
        this.isTyping = false;
        
      },
      error: (error) => {
        console.error("Error:", error);
        this.messages = [
          ...chatMessages,
          { message: "An error occurred. Please try again later.", sender: "HelpMate" ,direction: "incoming"},
        ];
        this.isTyping = false;
      }
    });
  }

  addToHistory(discussion: string) { this.discussionsHistory.push(discussion); }
}
