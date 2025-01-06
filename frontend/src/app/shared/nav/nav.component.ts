
import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';



@Component({

  selector: 'app-nav',

  templateUrl: './nav.component.html',

  styleUrls: ['./nav.component.scss'],

  standalone: true,  // Important pour les composants standalone

  imports: [MatIconModule]

})

export class AppNavComponent { }
