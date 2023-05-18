import { Component, OnInit, Input } from '@angular/core';
import { IPaginationModel } from './../Models/IPaginationModel';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent<T> implements OnInit {
  @Input() paginationModel: IPaginationModel<T> = {
    itemsPerPage: 5,
    pageNumber: 1,
    totalItems: 0,
    itemsLoaded: []
  };

  totalPageCount: number;
  pageNumberRange: number;
  pageNumbersToPrint: number [];

  ngOnInit() {
  }

  constructor(){
    this.paginationModel.pageNumber = this.paginationModel.pageNumber == null? 1 : this.paginationModel.pageNumber;
    this.paginationModel.itemsPerPage = this.paginationModel.itemsPerPage == null? 5 : this.paginationModel.itemsPerPage;
    this.totalPageCount = this.paginationModel.totalItems/this.paginationModel.itemsPerPage;

    // Preparing page numbers to print
    // When we are creating the pagination for the first time, the pagination shall always start from 1
    this.pageNumbersToPrint = [1, 2, 3, 4, 5];
    this.pageNumberRange = 5;
    if(this.totalPageCount < this.pageNumberRange){
      this.pageNumbersToPrint = this.pageNumbersToPrint.filter(element => element < this.pageNumberRange);
    }
  }

  onPageSelect(event: any){
    console.log(event);
  }
  // https://dev.to/this-is-angular/how-to-share-data-between-components-in-angular-4i60
}
