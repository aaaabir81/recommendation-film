import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchMovies(searchStr: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?query=${searchStr}`);
  }

  getMovieTrailers(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}/videos`);
  }  
  

  getTrend(): Observable<any> {
    return this.http.get(`${this.apiUrl}/trending/movie/day`);
  }

  getPopular(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?page=${page}`);
  }

  getUpComingMovies(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/upcoming?page=${page}`);
  }

  getTopRatedMovies(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/top_rated?page=${page}`);
  }

  getDiscoverMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/discover/movie`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/movie/list`);
  }

  getMoviesByGenre(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/${id}/movies`);
  }

  getMovie(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}`);
  }

  getMovieReviews(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}/reviews`);
  }

  getMovieCredits(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}/credits`);
  }

  getBackdropsImages(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}/images`);
  }

  getPersonDetail(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/person/${id}`);
  }
}
