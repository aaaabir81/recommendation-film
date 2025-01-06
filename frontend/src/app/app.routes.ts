import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './dashboard/movies-list/movies-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'movies-list', pathMatch: 'full' }, // Ajoute la redirection
      { path: 'movies-list', component: MoviesListComponent },
  { path: 'detail/:id', component: DetailComponent },

    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
