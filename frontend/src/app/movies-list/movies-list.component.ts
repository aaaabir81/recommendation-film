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
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatSortModule,
    MatDialogModule,
  ],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  providers: [MatDialog, MatDialogComponent],
})
export class MoviesListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading: boolean = false;
  errorMessage: string | null = null;
  isSmallScreen: boolean = window.innerWidth < 768;
  isIconClicked: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth < 768;
  }

  movies: any[] = [];

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.isSmallScreen = window.innerWidth < 768;
  }

  ngAfterViewInit(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data.results;
    });
  }

  
}