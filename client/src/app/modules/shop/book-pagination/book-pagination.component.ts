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

    // if amount of boxes is less than max+1, show all you have
    if (this.totalCount < this.maxAmountOfBoxes+1 || (this.maxAmountOfBoxes+1 > this.currentPage && 0 < this.currentPage)) {
      this.currentBoxes = [];
      let maxCounter = this.totalCount > this.maxAmountOfBoxes ? this.maxAmountOfBoxes : this.totalCount;
      for (let i = 1; i < maxCounter+1; i++) {
        const element = i;
        this.currentBoxes.push(i);
      }
    }

    // if current box is in last 3, show last 5
    // TODO - make this in for lopp !
    else if (this.currentPage === this.currentBoxes.length ||
             this.currentPage === this.currentBoxes.length-1 ||
             this.currentPage === this.currentBoxes.length-2) {
        this.currentBoxes = [];
        this.currentBoxes.push(this.currentBoxes.length-4);
        this.currentBoxes.push(this.currentBoxes.length-3);
        this.currentBoxes.push(this.currentBoxes.length-2);
        this.currentBoxes.push(this.currentBoxes.length-1);
        this.currentBoxes.push(this.currentBoxes.length);
    }

    // if current box in the middle of boxes
    // TODO - make this in for lopp !
    else {
        this.currentBoxes.push(this.currentPage-2);
        this.currentBoxes.push(this.currentPage-1);
        this.currentBoxes.push(this.currentPage);
        this.currentBoxes.push(this.currentPage+1);
        this.currentBoxes.push(this.currentPage+2);
    }

    // notice parent that new square was clicked
    if (!isInitial) {
      this.newSquareClicked.emit({ pageNum: squareNumber, pageSize: this.pageSize });
    }
  }

}
