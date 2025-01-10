import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMovieDetailsService } from '../../services/get-movie-details.service';
import { CommonModule } from '@angular/common';
import { WatchlistComponent } from '../../components/watchlist/watchlist.component';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';
import { AboutMoviesComponent } from '../../components/about-movies/about-movies.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { CastComponent } from '../../components/cast/cast.component';
import { HomeDataService } from '../../services/home-data.service';
import { WishlistService } from '../../services/wishlist.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports:[CommonModule, WatchlistComponent, TimeFormatPipe, AboutMoviesComponent, ReviewsComponent, CastComponent, FormsModule]
})
export class DetailComponent implements OnInit {
  movieId: string | null = null;
  isFavorite: boolean = false;
  movieDetails: any | null = null;
  isUserLoggedIn: boolean = false; // New property to track login status
  watchTime: string = ''; // Variable for storing the selected date
  tabMenus: any[] = [
    { id: 'aboutMovies', label: 'About Movies' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'cast', label: 'Cast' },
  ];
  selectedTabMenu: string | null = 'aboutMovies';
  selectedTabContent: string = 'about-movies';
  sliderValue: number = 5;

  constructor(
    private route: ActivatedRoute,
    private homeDataService: HomeDataService,
    private getMovieDetailsService: GetMovieDetailsService,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.isUserLoggedIn = !!localStorage.getItem('authToken');

    // Get ID from URL with activated route
    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('id');
      console.log('ID: ', this.movieId);
      if (this.movieId) {
        this.getMovieDetails(this.movieId);
      }
    });
  }

  getMovieDetails(id: string): void {
    this.getMovieDetailsService.getMovieDetails(id).subscribe((data) => {
      this.movieDetails = data;
    });
  }

  getMovieBackdropUrl(backdropPath: string | null): string {
    if (backdropPath) {
      return `https://image.tmdb.org/t/p/w500${backdropPath}`;
    } else {
      return 'https://via.placeholder.com/140x210';
    }
  }

  getMoviePosterUrl(posterPath: string | null): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    } else {
      return 'https://via.placeholder.com/140x210';
    }
  }

  selectTab(tabId: string): void {
    this.selectedTabMenu = tabId;
    switch (tabId) {
      case 'aboutMovies':
        this.selectedTabContent = 'about-movies';
        break;
      case 'reviews':
        this.selectedTabContent = 'reviews';
        break;
      case 'cast':
        this.selectedTabContent = 'cast';
        break;
      default:
        this.selectedTabContent = 'about-movies';
        break;
    }
  }

  showRateSection: boolean = false;

  onRatePage(): any {
    this.showRateSection = true;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('blur-effect');
  }

  closeRateSection(): void {
    this.showRateSection = false;
    document.body.style.overflow = 'auto';
    document.body.classList.remove('blur-effect');
  }

  closeRate() {
    this.showRateSection = false;
    document.body.style.overflow = 'auto';
  }

  okRate() {
    alert('Your vote has been confirmed');
    this.showRateSection = false;
    document.body.style.overflow = 'auto';
  }

  toggleFavorite(): void {
    if (!this.isFavorite) {
      const data = { tmdb_movie_id: this.movieDetails.id, type: 'movie' };
      this.homeDataService.addFavorite(data).subscribe({
        next: (response) => {
          console.log('Ajouté aux Favoris :', response);
          this.isFavorite = true;
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout aux Favoris :', err);
        },
      });
    } else {
      const movieId = this.movieDetails.id;
      this.homeDataService.removeFavorite(movieId).subscribe({
        next: (response) => {
          console.log('Retiré des Favoris :', response);
          this.isFavorite = false;
        },
        error: (err) => {
          console.error('Erreur lors de la suppression des Favoris :', err);
        },
      });
    }
  }

  addToWishlist(): void {
    const data = {
      tmdb_movie_id: this.movieDetails.id,
      type: 'movie',
      watch_time: this.watchTime,
    };

    this.wishlistService.addToWishlist(data).subscribe({
      next: (response) => {
        console.log('Ajouté à la wishlist avec succès :', response);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout à la wishlist :', err);
      },
    });
  }
}
