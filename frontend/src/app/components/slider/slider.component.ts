import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetTopMoviesService } from '../../services/get-top-movies.service';
import { GetMovieDetailsService } from '../../services/get-movie-details.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'], 
  standalone: true, 
  imports: [CommonModule]
})
export class SliderComponent implements OnInit {
  @Input() topMovies: any[] = [];
  redNoticeMovie: any = null; // Pour stocker les informations de Red Notice
  showTrailer: boolean = false; // Indicateur pour afficher le trailer
  trailerUrl: any = '';// URL sécurisée du trailer

  constructor(
    private router: Router,
    private getTopMoviesService: GetTopMoviesService,
    private getMovieDetailsService: GetMovieDetailsService,
    private sanitizer: DomSanitizer // Ajouter DomSanitizer ici
  ) {}

  ngOnInit(): void {
    // Récupérer les informations de Red Notice en priorité
    this.fetchRedNoticeDetails();
  }

  fetchRedNoticeDetails(): void {
    const redNoticeMovieId = "637649"; // ID de Red Notice

    // D'abord, récupérer les films populaires
    this.getTopMoviesService.getTopMovies().subscribe((data) => {
      this.topMovies = data.results.slice(0, 10);
    });

    // Récupérer les détails du film Red Notice
    this.getMovieDetailsService.getMovieDetails(redNoticeMovieId).subscribe((movie: any) => {
      this.redNoticeMovie = movie; // On stocke les informations de Red Notice

      // Maintenant qu'on a les infos, on récupère le trailer
      this.fetchTrailer(637649);

      // Après 10 secondes, afficher le trailer
      setTimeout(() => {
        this.showTrailer = true; // Afficher le trailer après 10 secondes
      }, 10000);
    });
  }

  fetchTrailer(movieId: number): void {
    this.getTopMoviesService.getMovieTrailers(movieId).subscribe((trailers: any) => {
      const youtubeTrailer = trailers.results.find((trailer: any) => trailer.site === 'YouTube');
      if (youtubeTrailer) {
        const trailerUrl = `https://www.youtube.com/embed/${youtubeTrailer.key}?autoplay=1`;
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(trailerUrl); // Sécuriser l'URL
      }
    });
  }

  getMoviePosterUrl(posterPath: string | null): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    } else {
      return 'https://via.placeholder.com/500x750';
    }
  }

  getMovieBackdropUrl(backdropPath: string | null): string {
    if (backdropPath) {
      return `https://image.tmdb.org/t/p/original${backdropPath}`;
    } else {
      return 'https://via.placeholder.com/1920x1080';
    }
  }

  navigateToDetail(movieId: number): void {
    this.router.navigate(['/detail', movieId]);
  }

  playTrailer(): void {
    this.showTrailer = true;
  }
}
