import { UserService } from '../user.service';  // Importer le service UserService
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
  imports: [FormsModule]  // Import FormsModule here
})
export class AddUserComponent {
  fname: string = '';  // Correspond à first_name
  lname: string = '';  // Correspond à last_name
  email: string = '';
  password: string = '';
  birth_date: string = '';
  genre: string = '';
  preferred_type: string = '';
  
  constructor(private userService: UserService) {}

  onSubmit() {
    const userData = {
      fname: this.fname,  // Correspond à first_name
      lname: this.lname,  // Correspond à last_name
      email: this.email,
      password: this.password,
      birth_date: this.birth_date,
      genre: this.genre,
      preferred_type: this.preferred_type,
      preferences: null, // Ou ajouter des données si nécessaire
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.userService.addUser(userData).subscribe(
      response => {
        console.log('Utilisateur ajouté:', response);
        // Vous pouvez rediriger l'utilisateur ou afficher un message de succès ici.
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    );
  }
}
