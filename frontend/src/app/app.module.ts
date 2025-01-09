import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MoviesListComponent } from './dashboard/movies-list/movies-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // Importez les routes

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule,
    RouterModule.forRoot(routes), // Ajoutez RouterModule avec les routes importées
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
