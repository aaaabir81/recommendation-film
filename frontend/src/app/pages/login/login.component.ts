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

  onLogin() {
    const credentials = { email: this.email, password: this.password };
    console.log('Données envoyées au backend :', credentials);

    this.authService.login(credentials).subscribe({
        next: (response) => {
            console.log('Réponse réussie :', response);
            localStorage.setItem('authToken', response.token);
            alert('Connexion réussie');
        },
        error: (err) => {
            console.error('Erreur de connexion :', err);
            if (err.status === 500) {
                alert('Erreur interne du serveur. Veuillez réessayer.');
            } else if (err.status === 401) {
                alert('Identifiants invalides');
            } else {
                alert('Une erreur inattendue est survenue.');
            }
        },
    });
}


}