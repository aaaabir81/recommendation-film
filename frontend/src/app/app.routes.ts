import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesListComponent } from './dashboard/movies-list/movies-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { LoginComponent } from './pages/login/login.component';



export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'login', component: LoginComponent }, // Ajout de la route pour le login
      { path: 'home', redirectTo: 'movies-list', pathMatch: 'full' }, // Ajoute la redirection
      { path: '', redirectTo: 'movies-list', pathMatch: 'full' }, // Ajoute la redirection
      { path: 'movies-list', component: MoviesListComponent },
      
      {path: 'discussion', component: DiscussionComponent},
  { path: 'detail/:id', component: DetailComponent },

    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
