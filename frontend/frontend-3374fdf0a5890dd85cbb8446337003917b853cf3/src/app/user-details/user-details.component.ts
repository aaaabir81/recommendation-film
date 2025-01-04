import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [UserService],
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatCardModule,
    MatIcon,
    MatButtonModule,
  ],
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getUserById(id).subscribe(
        (data) => {
          this.user = data; // Assegna i dati dell'utente
        },
        (error) => {
          console.error('Errore nel recuperare i dettagli utente', error);
        }
      );
    }
  }

  onLinkClick() {
    console.log('Link cliccato!', this.route);
  }
  
}
