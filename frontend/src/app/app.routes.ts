import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './dashboard/movies-list/movies-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { HomeUComponent } from './pages/home_u/home_u.component'; // Importez le composant HomeU
import { FavoritesComponent } from './pages/favorites/favorites.component'; // Importez le composant HomeU
import { SearchComponent } from './pages/search/search.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthComponent } from './pages/auth/auth.component';



export const routes: Routes = [
  // Redirection de la racine vers 'movies-list'
  { path: '', redirectTo: 'movies-list', pathMatch: 'full' },
  
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'movies-list', component: MoviesListComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'search', component: SearchComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'discussion', component: DiscussionComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'home_u', component: HomeUComponent }, // Redirection après connexion
      { path: 'profile', component: ProfileComponent }, // Redirection après connexion
      { path: 'auth', component: AuthComponent }, // Redirection après connexion
    ]
  },

  // Gestion des routes non trouvées
  { path: '**', redirectTo: 'movies-list' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
