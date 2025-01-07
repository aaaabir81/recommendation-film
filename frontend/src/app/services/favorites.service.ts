import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:8000/api'; // URL de l'API Laravel

  constructor(private http: HttpClient) {}

  getUserFavorites(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<any[]>(`${this.apiUrl}/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


  removeFavorite(tmdbMovieId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.delete(`${this.apiUrl}/favorites/${tmdbMovieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
