import { Component, Input, OnInit } from '@angular/core';
import { IPaginationModel } from './Models/IPaginationModel';
import { ITableModel } from './Models/ITableModel';
import { IPagingModel } from './Models/IPagingModel';

@Component({
  selector: 'ngx-pagination',
  templateUrl: './ngx-pagination.component.html',
  styleUrls: ['./ngx-pagination.component.scss']
})
export class NgxPaginationComponent<T> implements OnInit {
  @Input() paginationModel: IPaginationModel<T> | undefined;

  cardHeader: string;
  tableConfig: ITableModel;
  pagingModel: IPagingModel;

  constructor() {
    // Initialization to avoid error
    this.cardHeader = '';

    this.tableConfig = {
      allowDelete: false,
      allowEdit: false,
      isEditableTable: false,
      columnNames: new Array<string>,
      sourceData: new Array<Array<string>>
    };

    this.pagingModel = {
      pageNumber: 0,
      totalPageCount: 0,
      pageLengthOptions: [ 5, 10, 50 ],
      pageLength: 0,
      onPageLengthChange: null
    };
  }

  ngOnInit(): void {
    if(this.paginationModel == null || this.paginationModel == undefined)
      throw new Error('Object of type IPaginationModel is expected for paginationModel');

    this.cardHeader = this.paginationModel == undefined? '' : this.paginationModel.tableCardHeader;

    // Works for the table
    // Get column labels for ui tables
    let collumnLabels: string[] = Object.keys(this.paginationModel.tableMaping);

    // Get variable names of dynamic type T from mapping
    // As we are running the loop on label names and extracting the variable names from label and variable mapping,
    // we shall get the variable names in the correct sequence (the sequence of table column label)
    let variableNames: any[] = [];
    collumnLabels.forEach(label => {
      variableNames.push(this.paginationModel?.tableMaping[label]);
    })

    // Here we filter the source data for UI
    let sourceData: Array<Array<any>> = [];
    this.paginationModel.sourceData.forEach(element => {
      let elementKeyValuePair: string[] = [];
      Object.getOwnPropertyNames(element).forEach((val: string, idx, array) => {
        if(variableNames.includes(val))
          elementKeyValuePair.push((element as any)[val]);
      });
      sourceData.push(elementKeyValuePair);
    });

    // Load table config to render
    this.tableConfig = {
      allowDelete: this.paginationModel == undefined? false : this.paginationModel.allowDelete,
      allowEdit: this.paginationModel == undefined? false : this.paginationModel.allowEdit,
      isEditableTable: this.paginationModel == undefined? false : this.paginationModel.isEditableTable,
      columnNames: collumnLabels,
      sourceData: sourceData
    };

    // Works for paging
    let itemsPerPage = this.paginationModel.pageLengthOptions[this.paginationModel.pageLength];
    let totalPageCount = Math.ceil(this.paginationModel.totalItems/itemsPerPage);
    // If no products found, there shall still always be page 1 as the page has loaded successfully
    totalPageCount = totalPageCount <= 0? 1: totalPageCount;

    // Load paging config to render
    this.pagingModel = {
      pageNumber: this.paginationModel.pageNumber,
      pageLength: this.paginationModel.pageLength,
      pageLengthOptions: this.paginationModel.pageLengthOptions,
      totalPageCount: totalPageCount,
      onPageLengthChange: () => {
        console.log('Reload data');
      }
    };
  }
}
