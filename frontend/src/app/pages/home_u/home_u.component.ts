import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorites.service';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { CategoryTabComponent } from '../../components/category-tab/category-tab.component';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-home-u',
  templateUrl: './home_u.component.html',
  styleUrls: ['./home_u.component.css'],
  imports: [CommonModule,FormsModule], // Ajouter CommonModule ici
})
export class HomeUComponent implements OnInit {
  recommendations: any[] = [];
  favorites: any[] = [];
  wishlist: any[] = [];
  loadingRecommendations = true;
  loadingFavorites = true;
  loadingWishlist = true;
  showDatePicker: boolean = false;
selectedDate: string | null = null;
selectedMovieId: number | null = null;





  constructor(
   
    private favoriteService: FavoriteService,
    private wishlistService: WishlistService,
    private movieService: MovieService,private router: Router,
    private authService:AuthService
    
  ) {}

  ngOnInit(): void {
    this.loadRecommendations();
    this.loadFavorites();
    this.loadWishlist();
  }



  getMoviePosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  
  loadRecommendations(): void {
    const userId = this.authService.getUserId(); // Récupérer l'ID utilisateur connecté
    console.log('User ID:', userId);
    this.movieService.getRecommendations(userId).subscribe({
      next: (response) => {
        this.recommendations = response.results;
        this.loadingRecommendations = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des recommandations :', err);
        this.loadingRecommendations = false;
      },
    });    
    
  }
  

  loadFavorites(): void {
    this.favoriteService.getUserFavorites().subscribe({
      next: (response) => {
        this.favorites = response;
        this.loadingFavorites = false;
      },
      error: (err) => {
        console.error('Erreur lors du Loading :', err);
        this.loadingFavorites = false;
      },
    });
  }



  toggleFavorite(movie: any): void {
    const data = {
      tmdb_movie_id: movie.id,
      type: 'movie',
    };
  
    console.log('Données envoyées au backend :', data);
  
    this.favoriteService.addFavorite(data).subscribe({
      next: (response) => {
        console.log('Ajouté aux favoris avec succès :', response);
        this.favorites.push(movie);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout aux Favoris :', err);
      },
    });
  }

 

  isFavorite(movieId: number): boolean {
    return this.favorites.some((fav) => fav.tmdb_movie_id === movieId);
  }

  isWishlist(movieId: number): boolean {
    return this.wishlist.some((wish) => wish.tmdb_movie_id === movieId);
  }

  removeFromFavorites(movieId: number): void {
    if (!movieId) {
      console.error('Le champ tmdb_movie_id est manquant.');
      return;
    }
  
    this.favoriteService.removeFavorite(movieId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(favorite => favorite.tmdb_movie_id !== movieId);
        console.log('Favori retiré avec succès.');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du favori :', err);
      },
    });
  }
  
  
  
  openDatePicker(movieId: number): void {
    this.selectedMovieId = movieId; // Assigne l'ID du film
    this.showDatePicker = true; // Active le pop-up
  }
  
  
  closeDatePicker(): void {
    this.showDatePicker = false; // Masquez le modal
    this.selectedDate = null; // Réinitialisez la date
  }

  
  confirmDate(): void {
    console.log('ID du film :', this.selectedMovieId);
    console.log('Date sélectionnée :', this.selectedDate);
  
    if (!this.selectedMovieId || !this.selectedDate) {
      console.error('Date ou ID du film manquant.');
      return;
    }
  
    const data = {
      tmdb_movie_id: this.selectedMovieId,
      type: 'movie',
      watch_time: this.selectedDate,
    };
  
    this.wishlistService.addToWishlist(data).subscribe({
      next: (response) => {
        console.log('Ajouté à la wishlist avec succès :', response);
        this.wishlist.push(response.wishlist);
        this.closeDatePicker();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout à la wishlist :', err);
      },
    });
  }
  
  

  openWishlistModal(movie: any): void {
    this.selectedMovieId = movie.id; // Assignez l'ID du film sélectionné
    this.showDatePicker = true; // Affichez le modal
  }

  // Ajoute le film à la wishlist avec la date sélectionnée
  addToWishlist(movie: any, watchTime: string): void {
    if (!movie || !watchTime) {
      console.error('Film ou date manquants pour ajouter à la wishlist.');
      return;
    }
  
    const data = {
      tmdb_movie_id: movie.id,
      type: 'movie',
      watch_time: watchTime,
    };
  
    this.wishlistService.addToWishlist(data).subscribe({
      next: (response) => {
        console.log('Ajouté à la wishlist avec succès :', response);
        this.wishlist.push(movie); // Mettre à jour localement
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout à la wishlist :', err);
      },
    });
  }
  // Charger la wishlist
loadWishlist(): void {
  this.loadingWishlist = true;
  this.wishlistService.getUserWishlist().subscribe({
    next: (response) => {
      this.wishlist = response;
      this.loadingWishlist = false;
    },
    error: (err) => {
      console.error('Erreur lors du Loading :', err);
      this.loadingWishlist = false;
    },
  });
}

// Retirer un élément de la wishlist
removeFromWishlist(tmdbMovieId: number | undefined): void {
  if (!tmdbMovieId) {
    console.error('Le champ tmdb_movie_id est manquant.');
    return;
  }

  this.wishlistService.removeFromWishlist(tmdbMovieId).subscribe({
    next: () => {
      console.log('Élément retiré de la wishlist avec succès.');
      this.wishlist = this.wishlist.filter(movie => movie.tmdb_movie_id !== tmdbMovieId);
    },
    error: (err) => {
      console.error('Erreur lors de la suppression de la wishlist :', err);
    },
  });
}

navigateToDetail(movieId: number): void {
  this.router.navigate(['/detail', movieId]);
}
}
