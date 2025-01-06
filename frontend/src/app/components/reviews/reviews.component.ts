import { Component, Input, OnInit } from '@angular/core';
import { GetReviewsService } from '../../services/get-reviews.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  imports: [CommonModule],
})
export class ReviewsComponent implements OnInit {
  @Input() movieReviews: any[] = [];
  @Input() movieId: string | null = null;

  constructor(private getReviewsService: GetReviewsService) {}

  ngOnInit(): void {
        if (this.movieId) {
      this.getReviewsService.getReviews(this.movieId).subscribe((data) => {
        console.log(data);
        this.movieReviews = data.results;
      });
    }
  }
}
