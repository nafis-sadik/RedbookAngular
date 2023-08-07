import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { IPagingModel } from '../Models/IPagingModel';

@Component({
  selector: 'ngx-pagination-pages',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements AfterViewInit {
  @Input() pagingModel: IPagingModel | null;

  pageNumbersToPrint: number[];
  maxNumberOfPagesToRender: number = 5;
  selectedPageLength: string = '';

  constructor(private renderer: Renderer2) {
    // Preparing page numbers to print
    // When we are creating the pagination for the first time, the pagination shall always start from 1
    this.pageNumbersToPrint = [1, 2, 3, 4, 5];

    this.pagingModel = {
      pageLengthOptions: [5, 10, 50],
      pageLength: 0,
      pageNumber: 0,
      totalPageCount: 0,
      onPageLengthChange: null,
    };
  }

  // implement OnInit's `ngOnInit` method
  ngOnInit(): void {
    if (!this.pagingModel)
      throw 'Failed to initialize: Object of IPagingModel can not be undefined';

    this.selectedPageLength = this.pagingModel.pageLength.toString();
  }

  ngAfterViewInit(): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to render: Object of IPagingModel can not be undefined';

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
  }

  loadNext(): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';

    // Generate next page number, need to handle page limit exceed issue
    let nextPageNumber =
      this.pagingModel.pageNumber < this.pagingModel.totalPageCount - 1
        ? this.pagingModel.pageNumber + 1
        : -1;

    // If the next page is not in page, push it in the end and pop the first one
    if (
      this.pageNumbersToPrint.indexOf(nextPageNumber) < 0 &&
      nextPageNumber > 0
    ) {
      this.pageNumbersToPrint.push(nextPageNumber);
      this.pageNumbersToPrint.splice(0, 1);
    }

    // Lock and load
    if (nextPageNumber > 0) this.onPageSelect(nextPageNumber);
  }

  loadPrevious(): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';

    // Generate next page number, need to handle possible null object
    let nextPageNumber =
      this.pagingModel?.pageNumber != null
        ? this.pagingModel?.pageNumber - 1
        : -1;

    if (nextPageNumber > 0) {
      // If the next page is not in page, push it in the end and pop the first one
      if (this.pageNumbersToPrint.indexOf(nextPageNumber) < 0) {
        this.pageNumbersToPrint.splice(this.pageNumbersToPrint.length - 1, 1);
        this.pageNumbersToPrint.push(nextPageNumber);
        this.pageNumbersToPrint.sort();
      }

      // Lock and load
      this.onPageSelect(nextPageNumber);
    }
  }

  loadFirst(): void {
    if (this.pagingModel == null) {
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';
    }

    // The first page shall always contain these page numbers
    this.pageNumbersToPrint = [1, 2, 3, 4, 5];

    // If max page count is bellow 5, we filter them out here
    if (this.pagingModel.totalPageCount < this.maxNumberOfPagesToRender) {
      let totalPageCount = this.pagingModel.totalPageCount;
      this.pageNumbersToPrint = this.pageNumbersToPrint.filter(
        (element) => element < totalPageCount,
      );
      this.pageNumbersToPrint.length <= 0
        ? this.pageNumbersToPrint.push(1)
        : this.pageNumbersToPrint;
    }

    // Add active class to first element
    let selectedPageBtn = document.getElementsByClassName(
      'page-number-container',
    )[0];
    this.renderer.addClass(selectedPageBtn, 'active');

    // First page is definitely always page 1
    this.pagingModel.pageNumber = 1;
  }

  loadLast(): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';

    // Empty the array to load fixed values
    this.pageNumbersToPrint = [];

    // Add last 5 numbers from max page number
    for (let i = 0; i < this.maxNumberOfPagesToRender; i++) {
      if (this.pagingModel.totalPageCount - i > 0)
        this.pageNumbersToPrint.push(this.pagingModel.totalPageCount - i);
      else break;
    }

    // Incase, you came out with empty array, push 1
    if (this.pageNumbersToPrint.length <= 0) this.pageNumbersToPrint.push(1);

    this.pageNumbersToPrint.sort();

    // Last page is definitely always page totalPageCount
    this.pagingModel.pageNumber = this.pagingModel.totalPageCount;
  }

  onPageLengthChange(): void {
    if (this.pagingModel?.onPageLengthChange != null)
      this.pagingModel.onPageLengthChange();
  }
}
