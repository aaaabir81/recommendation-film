import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../access-layer/movie.service';
import { SearchMovieService } from '../../services/search-movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { NoResultComponent } from '../../components/no-result/no-result.component';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [FormsModule, CommonModule,SearchBarComponent,NoResultComponent,TimeFormatPipe]
})
export class SearchComponent {
  searchWord: string = '';
  searchResults: any[] = [];
  detailResults: any[] = [];

  constructor(private router: Router, private movieService: MovieService, private searchMovieService: SearchMovieService) {}

  onSearchEvent(word: string) {    
    this.searchWord = word;
    if (this.searchWord.trim() !== '') {
      this.searchMovieService.getSearchMovies(this.searchWord)
        .subscribe(results => {
          this.searchResults = results.results;
          this.searchResults.forEach((result) => this.navigateToMovie(result));
        });
    }
  }

  getMoviePosterUrl(posterPath: string | null): string {  
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    } else {
      return 'https://via.placeholder.com/500x750';
    }
  }

  navigateToMovie(result: any): void {
    this.movieService.getMovie(result.id).subscribe((details) => {
      result.id = details.id;
      result.genre = details.genres[0].name;
      result.runtime = details.runtime;
    });
  }

  // route to detail page with id
  navigateToDetail(result: any): void {
    this.movieService.getMovie(result.id).subscribe((details) => {
      const resultIndex = this.searchResults.findIndex(
        (result) => result.id === result.id
      );
      if (resultIndex !== -1) {
        this.searchResults[resultIndex].details = details;
      }
    });
    this.router.navigate(['/detail', result]);
  }


  goToHomePage(): void {
    this.router.navigate(['/']);
  }

  sendReport(): void {
    alert('Your report has been forwarded');
  }
}
