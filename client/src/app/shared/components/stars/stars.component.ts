import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input() bookRating;

  fullStars: number = 0;
  halfStar: boolean = false;
  emptyStarts: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.calculateStars();
  }

  calculateStars() {
    this.halfStar = this.isOdd(this.bookRating);
    if (this.halfStar) { this.bookRating--; }

    this.fullStars = this.bookRating / 2;
    this.emptyStarts = 5 - this.fullStars;

    if (this.halfStar) { this.emptyStarts--; }
  }

  // function that checks if number is odd or not
  isOdd(starNumber: number): boolean {
    return starNumber % 2 == 0 ? false : true;
  }

}
