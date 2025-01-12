import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL du backend Laravel

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Méthode pour récupérer l'ID de l'utilisateur connecté depuis localStorage
  getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id; // ou tout autre champ représentant l'ID de l'utilisateur
  }
}  