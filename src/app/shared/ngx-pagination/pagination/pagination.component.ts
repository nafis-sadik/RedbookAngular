import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { IPagingModel } from '../Models/IPagingModel';

@Component({
  selector: 'ngx-pagination-pages',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() pagingModel: IPagingModel;

  pageLengthArray: number[] = [];
  pageNumbersToPrint: number[] = [];
  maxNumberOfPagesToRender: number = 5;

  constructor(private renderer: Renderer2) {
    this.pageLengthArray = [5, 10, 50, 100];
  }

  // implement OnInit's `ngOnInit` method
  ngOnInit(): void {
    if (!this.pagingModel)
      throw 'Failed to initialize: Object of IPagingModel can not be undefined';

    // Preparing page numbers to print
    // When we are creating the pagination for the first time, the pagination shall always start from 1
    for (let i = 1; i <= this.pagingModel.totalPageCount; i++) {
      this.pageNumbersToPrint.push(i);
    }

    this.loadFirst();
  }

  onPageSelect(pageNumber: number): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';

    if (pageNumber > this.pagingModel.totalPageCount) return;

    let allPagedButtons = Array.from(
      document.getElementsByClassName('page-number-container'),
    );

    // Strip active class from every button
    allPagedButtons.forEach((btnElement: any) => {
      if (btnElement.outerText == pageNumber)
        this.renderer.addClass(btnElement, 'active');
      else this.renderer.removeClass(btnElement, 'active');
    });

    // Selected page must be updated in view model
    this.pagingModel.pageNumber = pageNumber;

    if (this.pagingModel?.onUpdate != null && typeof(this.pagingModel?.onUpdate) == 'function')
      this.pagingModel.onUpdate(this.pagingModel);
  }

  loadNext(): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';

      let selectedPageNumber = this.pagingModel.pageNumber + 1;
      // Limit page number generation beyond max number of pages
      if (selectedPageNumber > this.pagingModel.totalPageCount) return;

      // Beyond display - high
      if (
        selectedPageNumber >
        this.pageNumbersToPrint[this.pageNumbersToPrint.length - 1]
      ) {
        let newPaging: number[] = [];
        this.pageNumbersToPrint.forEach((pageNum) => {
          if (this.pagingModel && pageNum < this.pagingModel.totalPageCount) newPaging.push(pageNum + 1);
        });
        this.pageNumbersToPrint = newPaging;
      }
      this.pagingModel.pageNumber = selectedPageNumber;
      this.onPageSelect(selectedPageNumber);
  }

  loadPrevious(): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';

      let selectedPageNumber = this.pagingModel.pageNumber - 1;
      // <= 0
      if (selectedPageNumber <= 0) return;

      // Beyond display - low
      if (selectedPageNumber < this.pageNumbersToPrint[0]) {
        let newPaging: number[] = [];
        this.pageNumbersToPrint.forEach((pageNum) => {
          newPaging.push(pageNum - 1);
        });
        this.pageNumbersToPrint = newPaging;
      }

      this.pagingModel.pageNumber = selectedPageNumber;
      this.onPageSelect(selectedPageNumber);
  }

  loadFirst(): void {
    if (this.pagingModel == null) {
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';
    }

    this.pageNumbersToPrint = [1, 2, 3, 4, 5];
    if (this.pagingModel.totalPageCount <= 5)
      this.pageNumbersToPrint = this.pageNumbersToPrint.slice(
        0,
        this.pagingModel.totalPageCount,
      );
    this.onPageSelect(1);
  }

  loadLast(): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';

      let counter = 5;
      let numbersToDisplay: number[] = [];
      for (let i = this.pagingModel.totalPageCount; i > 0; i--) {
        if (counter > 0) {
          numbersToDisplay.push(i);
          counter--;
        }
      }
      this.pageNumbersToPrint = numbersToDisplay.reverse();
      this.onPageSelect(this.pagingModel.totalPageCount);
  }

  onPageLengthChange(): void {
    if (this.pagingModel?.onUpdate != null && typeof(this.pagingModel?.onUpdate) == 'function')
      this.pagingModel.onUpdate(this.pagingModel);
  }
}
