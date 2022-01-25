import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookSummaryComponent } from './components/book-summary/book-summary.component';
import { StarsComponent } from './components/stars/stars.component';



@NgModule({
  declarations: [BookSummaryComponent, StarsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BookSummaryComponent,
    StarsComponent
  ]
})
export class SharedModule { }
