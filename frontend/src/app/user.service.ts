import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './models/user.model';
import { environment } from '../app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`; 
  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Errore nel recupero degli utenti:', error);
        return throwError(() => error);
      })
    );
  }

  getUserById(id: number): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Errore nel recupero dell'utente con ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      catchError((error) => {
        console.error("Errore nell'aggiunta di un nuovo utente:", error);
        return throwError(() => error);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      catchError((error) => {
        console.error(
          `Errore nell'aggiornamento dell'utente con ID ${user.id}:`,
          error
        );
        return throwError(() => error);
      })
    );
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(
          `Errore nell'eliminazione dell'utente con ID ${id}:`,
          error
        );
        return throwError(() => error);
      })
    );
  }
}
