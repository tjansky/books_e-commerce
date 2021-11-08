import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-book-pagination',
  templateUrl: './book-pagination.component.html',
  styleUrls: ['./book-pagination.component.css']
})
export class BookPaginationComponent implements OnInit {

  @Output() newSquareClicked = new EventEmitter<{pageNum: number, pageSize: number}>();

  @Input() currentPage: number = 1;
  //@Input() totalPages: number = 11;
  @Input() pageSize: number = 10;
  @Input() totalCount: number = 10;

  firstSquareList: number[] = [];
  middleSquareList: number[] = [];
  lastSquareList: number[] = [];

  leftDots: boolean;
  rightDots: boolean;


  // how many squares on start and end before it starts to include middle squares
  @Input() startEndCount = 4;

  constructor() { }


  ngOnInit(): void {
    this.onSquareClick(this.currentPage, true);
  }

  onSquareClick(squareNumber: number, isInitial = false) {
    this.currentPage = squareNumber;
    this.firstSquareList = [];
    this.middleSquareList = [];
    this.lastSquareList = [];

    const isAtStart = squareNumber < this.startEndCount;
    const isAtEnd = squareNumber > this.totalCount - (this.startEndCount - 1);
    const isInMiddle = !isAtStart && !isAtEnd;

    const isShort = this.totalCount <= (this.startEndCount + 3);

    // if there is not enough squares only one list is required
    if (isShort) {
      this.leftDots = false;
      this.rightDots = false;

      let i = 1;
      while (i < this.totalCount + 1) {
        this.firstSquareList.push(i);
        i++;
      }
    } else { 
      // if list isnt short than there is more lists of squares:

      // if current page is less than startCount show first squares
      if (isAtStart) {
        this.leftDots = true;
        this.rightDots = false;
        let i = 1;
        while (i < this.startEndCount + 1) {
          this.firstSquareList.push(i);
          i++;
        }
      } else {
        this.firstSquareList = [1];
      }

      // if current page is at the end show last squares
      if (isAtEnd) {
        this.leftDots = true;
        this.rightDots = false;
        let i = this.totalCount - (this.startEndCount - 1);
        while (i <= this.totalCount) {
          this.lastSquareList.push(i);
          i++;
        }
      } else {
        this.lastSquareList = [this.totalCount];
      }

      // if current page is in the middle: show first, last and 3 of middle squares
      if (isInMiddle) {
        this.leftDots = true;
        this.rightDots = true;
        this.middleSquareList = [squareNumber - 1, squareNumber, squareNumber + 1];
      }
    }
    // notice parent that new square was clicked
    if (!isInitial) {
      this.newSquareClicked.emit({ pageNum: squareNumber, pageSize: this.pageSize });
    }
  }

}
