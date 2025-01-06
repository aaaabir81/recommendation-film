import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie :', response);

        // Enregistrer le token et les informations utilisateur
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Rediriger vers "movies-list" (page principale après connexion)
        this.router.navigate(['/movies-list']);
      },
      error: (err) => {
        console.error('Erreur de connexion :', err);
        alert('Identifiants invalides. Veuillez réessayer.');
      },
    });
  }
}