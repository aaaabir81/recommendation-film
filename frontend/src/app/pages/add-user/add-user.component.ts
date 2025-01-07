import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; // Importer le service UserService
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Import FormsModule ici
})
export class AddUserComponent {
  fname: string = ''; // Correspond à first_name
  lname: string = ''; // Correspond à last_name
  email: string = '';
  password: string = '';
  birth_date: string = '';
  genre: string = '';
  preferred_type: string = '';
  profilePictureFile: File | null = null; // Stocke le fichier sélectionné
  profilePicturePreview: string | null = null; // URL pour l'aperçu de l'image

  constructor(private userService: UserService) {}

  // Méthode appelée lorsque l'utilisateur sélectionne un fichier
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicturePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Stocker le fichier pour l'envoyer plus tard
      this.profilePictureFile = file;
    }
  }

  onSubmit() {
    const userData = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      password: this.password,
      birth_date: this.birth_date,
      genre: this.genre,
      preferred_type: this.preferred_type,
    };

    // Créer un FormData pour envoyer l'image et les données de l'utilisateur
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key as keyof typeof userData] as string);
    });

    if (this.profilePictureFile) {
      formData.append('profile_picture', this.profilePictureFile); // Ajouter l'image
    }

    // Envoi des données au backend via le service UserService
    this.userService.addUser(formData).subscribe(
      response => {
        console.log('Utilisateur ajouté:', response);
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    );
  }
}
