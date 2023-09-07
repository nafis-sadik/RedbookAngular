import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
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
  private maxNumberOfPagesToRender: number = 5;

  constructor(private renderer: Renderer2, private changeDetector: ChangeDetectorRef) {
    this.pageLengthArray = [5, 10, 100]
  }

  // implement OnInit's `ngOnInit` method
  ngOnInit(): void {
    if (!this.pagingModel)
      throw 'Failed to initialize: Object of IPagingModel can not be undefined';

    // Preparing page numbers to print
    // When we are creating the pagination for the first time, the pagination shall always start from 1
    for (let i = 1; i <= this.pagingModel.totalPageCount && i <= this.maxNumberOfPagesToRender; i++) {
      this.pageNumbersToPrint.push(i);
    }

    this.loadFirst();

    this.changeDetector.detectChanges();
  }

  // On page select method shall only update the values but shall not anything to the UI
  // [ngClass] is used in html to update the UI, so click methods shall call this method and UI shall be updated automatically
  // If some other method calls this method, dealing with UI is upto that method
  onPageSelect(pageNumber: number): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';

    if (pageNumber > this.pagingModel.totalPageCount) return;

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
    // If next page number is not presented as a clickable button in UI
    if(!this.pageNumbersToPrint.includes(selectedPageNumber)){
      for(let i = 0; i < this.maxNumberOfPagesToRender && this.pageNumbersToPrint[i] < this.pagingModel.totalPageCount; i++){
        this.pageNumbersToPrint[i] = this.pageNumbersToPrint[i] + 1;
      }
    }

    this.pagingModel.pageNumber = selectedPageNumber;
    this.onPageSelect(selectedPageNumber);
  }

  loadPrevious(): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';
    
    let selectedPageNumber = this.pagingModel.pageNumber - 1;

    if (selectedPageNumber <= 0) return;
  
    if(!this.pageNumbersToPrint.includes(selectedPageNumber)){
      for(let i = 0; i < this.maxNumberOfPagesToRender && this.pageNumbersToPrint[i] < this.pagingModel.totalPageCount; i++){
        this.pageNumbersToPrint[i] = this.pageNumbersToPrint[i] - 1;
      }
    }
    
    this.pagingModel.pageNumber = selectedPageNumber;
    this.onPageSelect(selectedPageNumber);
  }

  loadFirst(): void {
    if (this.pagingModel == null) 
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';
      
    if(this.pagingModel.pageNumber == 1) return;

    // Beyond display - high
    // If next page number is not presented as a clickable button in UI
    this.pageNumbersToPrint = [];
    console.log(this.maxNumberOfPagesToRender, this.pagingModel.totalPageCount)
    for(let i = 0; i < this.maxNumberOfPagesToRender && i < this.pagingModel.totalPageCount; i++){
      this.pageNumbersToPrint.push(i + 1);
    }

    this.onPageSelect(1);
  }

  loadLast(): void {
    if (this.pagingModel == undefined || this.pagingModel == null)
      throw 'Failed to execute operation: Object of IPagingModel can not be undefined';
      
      if(this.pagingModel.pageNumber == this.pagingModel.totalPageCount) return;

      let counter = this.maxNumberOfPagesToRender;
      this.pageNumbersToPrint = [];
      for (let i = this.pagingModel.totalPageCount; i > 0; i--) {
        if (counter > 0) {
          this.pageNumbersToPrint.push(i);
          counter--;
        }
      }

      this.pageNumbersToPrint = this.pageNumbersToPrint.reverse();
      this.onPageSelect(this.pagingModel.totalPageCount);
  }

  onPageLengthChange(): void {
    if (this.pagingModel?.onUpdate != null && typeof(this.pagingModel?.onUpdate) == 'function'){
      this.pagingModel.pageNumber = 1;
      this.pagingModel.onUpdate(this.pagingModel);
      
      this.pagingModel.totalPageCount = Math.ceil(this.pagingModel.totalItems/this.pagingModel.pageLength);

      // Preparing page numbers to print
      // When we are creating the pagination for the first time, the pagination shall always start from 1
      this.pageNumbersToPrint = [];
      for (let i = 1; i <= this.pagingModel.totalPageCount; i++) {
        this.pageNumbersToPrint.push(i);
      }
    }
  }
}
