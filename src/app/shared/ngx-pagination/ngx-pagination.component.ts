import { Component, Input, OnInit } from '@angular/core';
import { IPaginationModel } from './Models/IPaginationModel';
import { ITableModel } from './Models/ITableModel';
import { IPagingModel } from './Models/IPagingModel';
import { ISearchModel } from './Models/ISearchModel';
import { IAddNewModel } from './Models/IAddNewModel';

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
  searchModel: ISearchModel;
  addNewButtonConfig: IAddNewModel;

  allowSearch: boolean;
  allowAdd: boolean;

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

    this.searchModel = {
      inputFieldPlaceholder: 'Search Here',
      searchString: null,
      searchButtonLabel: null,
      showSearchIcon: true,
      onClick: null
    };

    this.addNewButtonConfig = {
      showIcon: true,
      addNewButtonLabel: null,
      onClick: null
    }

    this.allowAdd = false;
    this.allowSearch = false;
  }

  ngOnInit(): void {
    if(this.paginationModel == null || this.paginationModel == undefined)
      throw new Error('Object of type IPaginationModel is expected for paginationModel');

    this.cardHeader = this.paginationModel == undefined? '' : this.paginationModel.tableCardHeader;
    this.allowAdd = this.paginationModel.allowAdd;
    this.allowSearch = this.paginationModel.allowSearch;

    // Works for the table
    // Get column labels for ui tables
    let collumnLabels: string[] = Object.keys(this.paginationModel.tableConfig.tableMaping);

    // Get variable names of dynamic type T from mapping
    // As we are running the loop on label names and extracting the variable names from label and variable mapping,
    // we shall get the variable names in the correct sequence (the sequence of table column label)
    let variableNames: any[] = [];
    collumnLabels.forEach(label => {
      variableNames.push(this.paginationModel?.tableConfig.tableMaping[label]);
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
      allowDelete: this.paginationModel == undefined? false : this.paginationModel.tableConfig.allowDelete,
      allowEdit: this.paginationModel == undefined? false : this.paginationModel.tableConfig.allowEdit,
      isEditableTable: this.paginationModel == undefined? false : this.paginationModel.tableConfig.isEditableTable,
      columnNames: collumnLabels,
      sourceData: sourceData
    };

    // Works for paging
    let itemsPerPage = this.paginationModel.pagingConfig.pageLengthOptions[this.paginationModel.pagingConfig.pageLength];
    let totalPageCount = Math.ceil(this.paginationModel.pagingConfig.totalItems/itemsPerPage);
    // If no products found, there shall still always be page 1 as the page has loaded successfully
    totalPageCount = totalPageCount <= 0? 1: totalPageCount;

    // Load paging config to render
    this.pagingModel = {
      pageNumber: this.paginationModel.pagingConfig.pageNumber,
      pageLength: this.paginationModel.pagingConfig.pageLength,
      pageLengthOptions: this.paginationModel.pagingConfig.pageLengthOptions,
      totalPageCount: totalPageCount,
      onPageLengthChange: this.paginationModel.pagingConfig.onChange
    };

    // Load search field config to render
    if(this.paginationModel.searchingConfig != null && this.paginationModel.allowSearch)
      this.searchModel = {
        inputFieldPlaceholder: this.paginationModel.searchingConfig.inputFieldPlaceholder,
        searchString: this.paginationModel.searchingConfig.searchString,
        searchButtonLabel: this.paginationModel.searchingConfig.buttonLabel,
        showSearchIcon: this.paginationModel.searchingConfig.showIcon,
        onClick: this.paginationModel.searchingConfig.onClick
      };

    // Load add new button config to render
    if(this.paginationModel.addNewElementButtonConfig != null && this.paginationModel.allowAdd)
      this.addNewButtonConfig = {
        addNewButtonLabel: this.paginationModel.addNewElementButtonConfig.buttonLabel,
        showIcon: this.paginationModel.addNewElementButtonConfig.showIcon,
        onClick: this.paginationModel.addNewElementButtonConfig.onClick
      }
  }
}
