import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [FormsModule, HttpClientModule, MatIcon, CommonModule]
})
export class AppNavComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  user: any = null;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté
    this.updateLoginStatus();

    // Écouter les événements de navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateLoginStatus();
      });
  }

  updateLoginStatus(): void {
    this.isUserLoggedIn = !!localStorage.getItem('authToken');
    if (this.isUserLoggedIn) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
    } else {
      this.user = null;
    }
    // Déclencher la détection des changements manuellement
    this.cdr.detectChanges();
  }

  navigateToHome() {
    this.router.navigate(['/movies-list']);
  }

  navigateToHome_U() {
    this.router.navigate(['/home_u']);
  }

  navigateToFavorites() {
    this.router.navigate(['/favorites']);
  }

  navigateToWishlist() {
    this.router.navigate(['/wishlist']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToCreate() {
    this.router.navigate(['/auth']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth']);
  }

  calculateAge(birthDate: string | undefined): number {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.isUserLoggedIn = false;
    this.user = null;
    this.router.navigate(['/auth']);
  }

  navigateToDiscussion(): void {
    this.router.navigate(['/discussion']);
  }
}
