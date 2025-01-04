import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  RouterModule,
} from '@angular/router'; 
import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { UserService } from './user.service'; 

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [UserService, localProvideHttpClient()],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'elenco-utenti';
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigazione in corso...');
        
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
      
        this.loading = false;
      }
    });
  }
}

function localProvideHttpClient(): import('@angular/core').Provider {
  // Provide HttpClient implementation here
  return { provide: 'HttpClient', useClass: HttpClient };
}
