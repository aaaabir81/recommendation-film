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
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService, MatDialog, MatDialogComponent],
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users = new MatTableDataSource<User>([]);
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'created_at',
    'updated_at',
    'actions',
  ];
  loading: boolean = false;
  errorMessage: string | null = null;
  isSmallScreen: boolean = window.innerWidth < 768;
  isIconClicked: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isSmallScreen = window.innerWidth < 768;
  }

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isSmallScreen = window.innerWidth < 768;
    this.fetchUsers();
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.users.sort = this.sort!;
    }
  }

  fetchUsers(): void {
    this.loading = true;
    this.errorMessage = null;

    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users.data = users;
        this.loading = false;
      },
      (error: any) => {
        console.error('Errore nel recuperare gli utenti', error);
        this.errorMessage =
          'Errore nel recuperare gli utenti. Riprova più tardi.';
        this.loading = false;
      }
    );
  }

  addUser(): void {
    this.router.navigate(['/user-form']);
  }

  editUser(userId: number): void {
    this.router.navigate(['/user-form', userId]);
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: {
        title: 'Conferma Eliminazione',
        message: 'Sei sicuro di voler eliminare questo utente?',
        cancelButtonText: 'Annulla',
        confirmButtonText: 'Elimina',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.users.data = this.users.data.filter(
              (user: User) => user.id !== id
            );
          },
          (error: any) => {
            console.error("Errore durante l'eliminazione dell'utente", error);
            alert("C'è stato un errore durante l'eliminazione dell'utente.");
          }
        );
      } else {
        console.log('Eliminazione annullata');
      }
    });
  }

  viewDetails(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  clearFilter(): void {
    this.users.filter = '';
  }

  onIconClick(): void {
    this.isIconClicked = true;
    alert('Salve, spero che apprezzi la demo! ;)');
    setTimeout(() => {
      this.isIconClicked = false;
      console.log('Operazione completata');
    }, 2000); 
  }
}
