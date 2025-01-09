import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:8000/api'; // URL de l'API Laravel

  constructor(private http: HttpClient) {}

  getUserWishlist(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<any[]>(`${this.apiUrl}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  addToWishlist(data: { tmdb_movie_id: number; type: string; watch_time?: string }): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.post(`${this.apiUrl}/wishlist`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  

  removeFromWishlist(tmdbMovieId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.delete(`${this.apiUrl}/wishlist/${tmdbMovieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
 

  removeWishlistItem(tmdbMovieId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    return this.http.delete(`http://localhost:8000/api/wishlist/${tmdbMovieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  
  
}