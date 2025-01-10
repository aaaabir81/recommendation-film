// discussion-modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageComponent } from '../components/message/message.component';

@Component({
  selector: 'app-discussion-modal',
  templateUrl: './discussion-modal.component.html',
  styleUrls: ['./discussion-modal.component.css'],
  imports: [CommonModule, MessageComponent]
})
export class DiscussionModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { messages: any[] }) {
    // Ajouter la direction des messages
    this.data.messages = this.data.messages.map(message => ({
      ...message,
      direction: message.sender === 'CineChill' ? 'incoming' : 'outgoing'
    }));
  }
}
