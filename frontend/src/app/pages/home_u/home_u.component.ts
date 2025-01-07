import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetGenresService } from '../../services/get-genres.service';
import { HomeDataService } from '../../services/home-data.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { CategoryTabComponent } from '../../components/category-tab/category-tab.component';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'home-u',
  templateUrl: './home_u.component.html',
  styleUrls: ['./home_u.component.css'],
  
   
  imports: [FormsModule,SearchBarComponent, MatIconModule,SliderComponent, CategoryTabComponent],
})
export class HomeUComponent implements OnInit {
  user: any;
  favorites: any[] = [];
  wishlist: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    public getGenresService: GetGenresService,
    private homeDataService: HomeDataService,
    private userDataService: UserDataService,
   

  ) {}

  ngOnInit(): void {
    this.homeDataService.getHomeDetails().subscribe({
      next: (response) => {
        this.user = response.user;
        this.favorites = response.favorites;
        this.wishlist = response.wishlist;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données :', err);
      },
    });
  }

  onSearchBarClick(): void {
    this.router.navigate(['/search']);
  }

 
  
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Déconnexion réussie');
        localStorage.removeItem('authToken'); // Supprimez le token localement
        this.router.navigate(['/login']); // Redirigez vers la page de connexion
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion :', err);
      },
    });
  }
  


}
