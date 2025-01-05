import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'movies-list', pathMatch: 'full' },
  { path: 'movies-list', component: MoviesListComponent },
  { path: 'add-user', component: AddUserComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  