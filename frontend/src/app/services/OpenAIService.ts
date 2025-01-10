import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  chat(messages: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/openai/chat`, { messages });
  }
}
