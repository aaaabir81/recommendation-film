import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [UserService],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId: number | null = null;
  data: any;
  dialogDuration: number = 2000;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.userService.getUserById(this.userId).subscribe(
          (user) => {
            if (user) {
              this.userForm.patchValue(user);
            }
          },
          (error) => {
            console.error("Errore nel recuperare l'utente:", error);
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: {
        title: this.isEditMode ? 'Conferma Modifica' : 'Conferma Aggiunta',
        message: `Sei sicuro di voler ${
          this.isEditMode ? 'aggiornare' : 'aggiungere'
        } questo utente?`,
        cancelButtonText: 'Annulla',
        confirmButtonText: this.isEditMode ? 'Aggiorna' : 'Aggiungi',
        showButtons: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        const userData = { ...this.userForm.value, id: this.userId };
        let userRequest$;
        if (this.isEditMode) {
          userRequest$ = this.userService.updateUser(userData);
        } else {
          userRequest$ = this.userService.addUser(userData);
        }

        userRequest$.subscribe({
          next: (response) => {
            const confirmationDialogRef = this.dialog.open(MatDialogComponent, {
              data: {
                title: 'Successo',
                message: this.isEditMode
                  ? 'Utente aggiornato con successo!'
                  : 'Utente aggiunto con successo!',
                showButtons: false,
              },
            });
            setTimeout(() => {
              confirmationDialogRef.close();
              this.router.navigate(['/user-list']);
            }, this.dialogDuration);
          },
          error: (error) => {
            const confirmationDialogRef = this.dialog.open(MatDialogComponent, {
              data: {
                title: 'Errore',
                message: `Si è verificato un errore durante la creazione o modifica dell'utente: ${
                  error.message || 'Errore sconosciuto'
                }`,
                cancelButtonText: 'Riprova',
                confirmButtonText: 'OK',
                showButtons: false,
              },
            });
            setTimeout(() => {
              confirmationDialogRef.close();
            }, this.dialogDuration);
          },
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/user-list']);
  }
}
