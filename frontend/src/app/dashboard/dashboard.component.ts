import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppNavComponent } from '../shared/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { Router, RouterLink } from '@angular/router';
import { GetGenresService } from '../services/get-genres.service';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    AppNavComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    public getGenresService: GetGenresService
  ) {}

  isFullScreen: boolean = false;

ngOnInit() {
  this.isFullScreen = true; // Définir sur true si l'affiche doit prendre tout l'écran
}

navigateToDiscussion(): void {
  this.router.navigate(['/discussion']);
}


  goToHome(): void {
    this.router.navigate(['/movies-list']);
  }

  onSearchBarClick() {
    this.router.navigate(['/search']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToFav(): void {
    this.router.navigate(['/favorites']);
  }
  goTowish(): void {
    this.router.navigate(['/wishlist']);
  }
}
