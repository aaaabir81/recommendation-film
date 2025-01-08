import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common'; // Importation ici


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
   imports: [FormsModule,CommonModule]
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistService.getUserWishlist().subscribe({
      next: (data) => {
        this.wishlist = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement de la wishlist.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  removeFromWishlist(tmdbMovieId: number): void {
    this.wishlistService.removeFromWishlist(tmdbMovieId).subscribe({
      next: () => {
        this.wishlist = this.wishlist.filter(item => item.tmdb_movie_id !== tmdbMovieId);
        console.log('Élément retiré de la wishlist avec succès.');
      },
      error: (err) => console.error('Erreur lors de la suppression :', err),
    });
  }
}
