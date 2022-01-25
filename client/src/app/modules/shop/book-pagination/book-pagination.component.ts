import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-book-pagination',
  templateUrl: './book-pagination.component.html',
  styleUrls: ['./book-pagination.component.css']
})
export class BookPaginationComponent implements OnInit {

  @Output() newSquareClicked = new EventEmitter<{pageNum: number, pageSize: number}>();
  // this.newSquareClicked.emit({ pageNum: squareNumber, pageSize: this.pageSize });

  @Input() currentPage: number = 1;
  @Input() pageSize: number;
  @Input() totalCount: number;

  currentBoxes: number[] = [];
  maxAmountOfBoxes = 5;


  constructor() { }


  ngOnInit(): void {
    this.onSquareClick(this.currentPage, true);
  }

  onSquareClick(squareNumber: number, isInitial = false) {
    this.currentPage = squareNumber;

    // notice parent that new square was clicked
    if (!isInitial) {
      this.newSquareClicked.emit({ pageNum: squareNumber, pageSize: this.pageSize });
    }

    // calculation for pagination boxes, starting point
    let startingSquare;
    if (this.totalCount <= this.maxAmountOfBoxes) {
      startingSquare = 1;
    }

    else if (this.currentPage-1 <= 0) {
      startingSquare = 1
    }

    else if (this.currentPage-2 <= 0) {
      startingSquare = 1
    }

    else if (this.currentPage == this.totalCount) {
      startingSquare = this.currentPage - 4;
    }

    else if (this.currentPage+1 == this.totalCount) {
      startingSquare = this.currentPage - 3;
    }

    else {
      startingSquare = this.currentPage - 2;
    }

    this.makeBoxes(startingSquare, this.maxAmountOfBoxes, this.totalCount);

  }

  private makeBoxes(startingBox: number, maxBoxes: number, totalAmountBoxes: number) {
    this.currentBoxes = [];
    let counter = 0;

    while(this.currentBoxes.length < maxBoxes && startingBox+counter <= totalAmountBoxes) {
      this.currentBoxes.push(startingBox+counter);
      counter++;
    }

  }

}
