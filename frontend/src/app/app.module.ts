import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import pour [(ngModel)]
import { MoviesListComponent } from './dashboard/movies-list/movies-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import{FavoritesComponent}from './pages/favorites/favorites.component'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // Déclarez vos composants ici
    MoviesListComponent ,AddUserComponent,
    FavoritesComponent,


  ],
  imports: [
    BrowserModule,
    MatIconModule, 
    FormsModule, // Nécessaire pour [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
