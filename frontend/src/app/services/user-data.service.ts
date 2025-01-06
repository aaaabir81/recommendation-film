import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private apiUrl = 'http://localhost:8000/api'; // URL de l'API Laravel

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les détails utilisateur (favoris et wishlist)
  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/user-details`, { headers });
  }

  // Méthode pour ajouter un favori
  addFavorite(data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/favorites`, data, { headers });
  }

  // Méthode pour supprimer un favori
  removeFavorite(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/favorites/${id}`, { headers });
  }

  // Méthode pour ajouter à la wishlist
  addToWishlist(data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/wishlist`, data, { headers });
  }

  // Méthode pour supprimer de la wishlist
  removeFromWishlist(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/wishlist/${id}`, { headers });
  }
}
