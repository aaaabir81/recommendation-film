import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import pour [(ngModel)]
import { MoviesListComponent } from './dashboard/movies-list/movies-list.component';
import { AddUserComponent } from './add-user/add-user.component';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, // Déclarez vos composants ici
    MoviesListComponent ,AddUserComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule, // Nécessaire pour [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
