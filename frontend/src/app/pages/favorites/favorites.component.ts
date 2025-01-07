import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorites.service.js';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  imports: [CommonModule] // Importez CommonModule ici
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteService.getUserFavorites().subscribe({
      next: (response) => {
        this.favorites = response; // Stocke les détails des films favoris
        console.log('Données des favoris reçues :', this.favorites); // Vérifiez la structure ici
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des favoris :', err);
        this.errorMessage = 'Impossible de charger les favoris.';
        this.loading = false;
      }
    });
  }
  

  removeFromFavorites(tmdbMovieId: number | undefined): void {
    if (!tmdbMovieId) {
      console.error('tmdbMovieId est indéfini.');
      return;
    }
  
    console.log('Suppression du favori avec tmdbMovieId :', tmdbMovieId);
  
    this.favoriteService.removeFavorite(tmdbMovieId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(movie => movie.tmdb_movie_id !== tmdbMovieId);
        console.log('Favori retiré avec succès');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du favori :', err);
      }
    });
  }
  
  
}