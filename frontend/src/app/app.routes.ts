import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './dashboard/movies-list/movies-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeUComponent } from './pages/home_u/home_u.component'; // Importez le composant HomeU
import { FavoritesComponent } from './pages/favorites/favorites.component'; // Importez le composant HomeU
import { SearchComponent } from './pages/search/search.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ProfileComponent } from './pages/profile/profile.component';



export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'home', redirectTo: 'movies-list', pathMatch: 'full' },
      { path: 'movies-list', component: MoviesListComponent },
      { path: 'create', component: AddUserComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'search', component: SearchComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'discussion', component: DiscussionComponent },
      { path: 'detail/:id', component: DetailComponent },




      { path: 'home_u', component: HomeUComponent }, // Redirection après connexion
      { path: 'profile', component: ProfileComponent }, // Redirection après connexion



    
    ]
  },

  // Ajout d'une redirection pour la racine vers 'movies-list'
  { path: '', redirectTo: '/movies-list', pathMatch: 'full' },

  // Ajouter d'autres routes si nécessaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
