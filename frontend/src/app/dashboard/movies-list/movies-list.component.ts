import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieService } from '../../services/movie.service';
import { GetGenresService } from '../../services/get-genres.service';
import { SliderComponent } from '../../components/slider/slider.component';
import { CategoryTabComponent } from '../../components/category-tab/category-tab.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    SliderComponent,
    CategoryTabComponent,

  ],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent{
  constructor(
    private router: Router,
    public getGenresService: GetGenresService
  ) {}

  onSearchBarClick() {
    this.router.navigate(['/search']);
  }

  
}