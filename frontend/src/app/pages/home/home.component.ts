import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetGenresService } from '../../services/get-genres.service';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { CategoryTabComponent } from '../../components/category-tab/category-tab.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[SearchBarComponent,SliderComponent,CategoryTabComponent]
})
export class HomeComponent {
  constructor(
    private router: Router,
    public getGenresService: GetGenresService
  ) {}

  onSearchBarClick() {
    this.router.navigate(['/search']);
  }
}