import { AfterViewInit, Component, Input, Renderer2 } from '@angular/core';
import { IPaginationModel } from '../Models/IPaginationModel';

@Component({
  selector: 'ngx-pagination-pages',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent<T> implements AfterViewInit {
  @Input() paginationModel: IPaginationModel<T> | undefined;

  totalPageCount: number;
  pageNumbersToPrint: number [];
  maxNumberOfPagesToRender: number = 5;

  ngAfterViewInit() {
    if(this.paginationModel == undefined || this.paginationModel == null)
      throw 'Failed to render: Object of IPaginationModel<T> can not be undefined';

    this.loadFirst();
  }

  // implement OnInit's `ngOnInit` method
  ngOnInit() {
    if(this.paginationModel == undefined || this.paginationModel == null)
      throw 'Failed to initialize: Object of IPaginationModel<T> can not be undefined';

    this.paginationModel.pageNumber = this.paginationModel.pageNumber == null? 1 : this.paginationModel.pageNumber;
    this.paginationModel.itemsPerPage = this.paginationModel.itemsPerPage == null? 5 : this.paginationModel.itemsPerPage;
    this.totalPageCount = Math.ceil(this.paginationModel.totalItems/this.paginationModel.itemsPerPage);

    // If no products found, there shall still always be page 1 as the page has loaded successfully
    this.totalPageCount = this.totalPageCount <= 0? 1: this.totalPageCount;
  }

  constructor(private renderer: Renderer2){
    // If no products found, there shall still always be page 1 as the page has loaded successfully
    this.totalPageCount = 1;

    // Preparing page numbers to print
    // When we are creating the pagination for the first time, the pagination shall always start from 1
    this.pageNumbersToPrint = [1, 2, 3, 4, 5];
  }

  onPageSelect(pageNumber: number){
    if(this.paginationModel == undefined || this.paginationModel == null)
      throw 'Failed to execute operation: Object of IPaginationModel<T> can not be undefined';

    if(pageNumber > this.totalPageCount)
      return

    let allPagedButtons = Array.from(document.getElementsByClassName('page-number-container'));

    // Strip active class from every button
    allPagedButtons.forEach((btnElement: any) => {
      if(btnElement.outerText == pageNumber)
        this.renderer.addClass(btnElement, 'active');
      else
        this.renderer.removeClass(btnElement, 'active');
    });

    // Selected page must be updated in view model
    this.paginationModel.pageNumber = pageNumber;
  }

  loadNext(){
    if(this.paginationModel == undefined || this.paginationModel == null)
      throw 'Failed to execute operation: Object of IPaginationModel<T> can not be undefined';

    // Generate next page number, need to handle possible null object
    let nextPageNumber = this.paginationModel?.pageNumber != null? this.paginationModel?.pageNumber + 1  : -1;

    // If the next page is not in page, push it in the end and pop the first one
    if(this.pageNumbersToPrint.indexOf(nextPageNumber) < 0){
      this.pageNumbersToPrint.push(nextPageNumber);
      this.pageNumbersToPrint.splice(0, 1);
    }

    // Lock and load
    if(nextPageNumber > 0)
      this.onPageSelect(nextPageNumber);
  }

  loadPrevious(){
    if(this.paginationModel == undefined || this.paginationModel == null)
      throw 'Failed to execute operation: Object of IPaginationModel<T> can not be undefined';

    // Generate next page number, need to handle possible null object
    let nextPageNumber = this.paginationModel?.pageNumber != null? this.paginationModel?.pageNumber - 1  : -1;

    if(nextPageNumber > 0)
    {
      // If the next page is not in page, push it in the end and pop the first one
      if(this.pageNumbersToPrint.indexOf(nextPageNumber) < 0){
        this.pageNumbersToPrint.splice(this.pageNumbersToPrint.length - 1, 1);
        this.pageNumbersToPrint.push(nextPageNumber);
        this.pageNumbersToPrint.sort();
      }

      // Lock and load
      this.onPageSelect(nextPageNumber);
    }
  }

  loadFirst(){
    if(this.paginationModel == undefined || this.paginationModel == null)
      throw 'Failed to execute operation: Object of IPaginationModel<T> can not be undefined';

    // The first page shall always contain these page numbers
    this.pageNumbersToPrint = [1, 2, 3, 4, 5];

    // If max page count is bellow 5, we filter them out here
    if(this.totalPageCount < this.maxNumberOfPagesToRender){
      this.pageNumbersToPrint = this.pageNumbersToPrint.filter(element => element < this.totalPageCount);
      this.pageNumbersToPrint.length <= 0 ? this.pageNumbersToPrint.push(1) : this.pageNumbersToPrint;
    }

    // Add active class to first element
    let selectedPageBtn = document.getElementsByClassName('page-number-container')[0];
    this.renderer.addClass(selectedPageBtn, 'active');

    // First page is definitely always page 1
    this.paginationModel.pageNumber = 1;
  }

  loadLast(){
    if(this.paginationModel == undefined || this.paginationModel == null)
      throw 'Failed to execute operation: Object of IPaginationModel<T> can not be undefined';

    // Empty the array to load fixed values
    this.pageNumbersToPrint = [];

    // Add last 5 numbers from max page number
    for(let i = 0; i < this.maxNumberOfPagesToRender; i++){
      if(this.totalPageCount - i > 0)
        this.pageNumbersToPrint.push(this.totalPageCount - i);
      else
        break;
    }

    // Incase, you came out with empty array, push 1
    if(this.pageNumbersToPrint.length <= 0)
      this.pageNumbersToPrint.push(1);

    this.pageNumbersToPrint.sort();

    // Last page is definitely always page totalPageCount
    this.paginationModel.pageNumber = this.totalPageCount;
  }
  // https://dev.to/this-is-angular/how-to-share-data-between-components-in-angular-4i60
}
