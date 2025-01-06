import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importer FormsModule

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule] // Ajouter FormsModule ici
})
export class SearchBarComponent {
  searchWord: string = '';
  searchResults: any[] = [];

  @Output() searchEvent = new EventEmitter<string>();

  onSearch() {
    if (this.searchWord.trim() !== '') {
      this.searchEvent.emit(this.searchWord);
    }
  }
}
