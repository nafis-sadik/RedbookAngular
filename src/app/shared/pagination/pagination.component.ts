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
    let pageNumberRange = 5;
    if(this.totalPageCount < this.pageNumbersToPrint[0] + pageNumberRange){
      console.log(this.pageNumbersToPrint)
      this.pageNumbersToPrint = this.pageNumbersToPrint.filter(element => element < this.totalPageCount);
      this.pageNumbersToPrint.length <= 0 ? this.pageNumbersToPrint.push(1) : this.pageNumbersToPrint;
      console.log(this.paginationModel)
    }
  }

  onPageSelect(pageNumber: number){
    this.pageNumbersToPrint = [];
    for (let i = pageNumber; i < pageNumber + 3; i++){
      this.pageNumbersToPrint.push(i);
    }
    for (let i = pageNumber; i < pageNumber - 1; i--){
      this.pageNumbersToPrint.push(i);
    }
    // let pageNumberRange = 5;
    // if(this.totalPageCount < this.pageNumbersToPrint[0] + pageNumberRange){
    //   console.log(this.pageNumbersToPrint)
    //   this.pageNumbersToPrint = this.pageNumbersToPrint.filter(element => element < this.totalPageCount);
    //   this.pageNumbersToPrint.length <= 0 ? this.pageNumbersToPrint.push(1):this.pageNumbersToPrint;
    // }
  }
  // https://dev.to/this-is-angular/how-to-share-data-between-components-in-angular-4i60
}
