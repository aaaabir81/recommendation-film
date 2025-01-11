import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Assurez-vous que ce service existe
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service'; // Importer le service UserService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class AuthComponent implements OnInit {
  fname: string = ''; // Correspond à first_name
  lname: string = ''; // Correspond à last_name
  email: string = '';
  password: string = '';
  birth_date: string = '';
  genre: string = '';
  preferred_type: string = '';
  profilePictureFile: File | null = null; // Stocke le fichier sélectionné
  profilePicturePreview: string | null = null; // URL pour l'aperçu de l'image

  // Variables pour la gestion des données du formulaire
  name: string = '';
  loginEmail: string = '';
  loginPassword: string = '';
  user: any;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Retrieve the user information from local storage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  // Fonction de gestion de la soumission de la connexion
  onLogin(): void {
    // Réinitialiser les champs de formulaire
    this.loginEmail = '';
    this.loginPassword = '';

    const credentials = { email: this.loginEmail, password: this.loginPassword };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie :', response);

        // Enregistrer le token et les informations utilisateur dans localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.user = response.user;

        

        // Rediriger vers "home_u" (page principale après connexion)
        this.router.navigate(['/home_u']);
      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
        alert('Identifiants invalides. Veuillez réessayer.');
      },
    });
  }

  // Fonction de gestion de la soumission de l'inscription
  onSubmitSignup(): void {
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
        console.log('Inscription réussie:', response);

        // Enregistrer le token et les informations utilisateur
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.user = response.user;

              
        window.location.reload();
      },
      error => {
        console.error('Erreur lors de l\'inscription:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    );
  }

  // Gestion des transitions entre les formulaires
  toggleSignup(): void {
    const container = document.getElementById('container');
    if (container) container.classList.add('active');
  }

  toggleLogin(): void {
    const container = document.getElementById('container');
    if (container) container.classList.remove('active');
  }

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
