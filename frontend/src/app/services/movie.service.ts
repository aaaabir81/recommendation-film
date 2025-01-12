import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getRecommendations(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recommendations/${userId}`);
  }
  

  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movies`);
  }
  
}

