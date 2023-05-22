import { Component, Input, OnInit } from '@angular/core';
import { IPaginationModel } from './Models/IPaginationModel';
import { ITableConfig } from './Models/ITableConfig';

@Component({
  selector: 'ngx-pagination',
  templateUrl: './ngx-pagination.component.html',
  styleUrls: ['./ngx-pagination.component.scss']
})
export class NgxPaginationComponent<T> implements OnInit {
  @Input() paginationModel: IPaginationModel<T> | undefined;
  config: ITableConfig;
  cardHeader: string;

  constructor() {
    // Initialization to avoid error
    this.cardHeader = '';

    this.config = {
      allowDelete: false,
      allowEdit: false,
      isEditableTable: false,
      columnNames: [],
      sourceData: []
    };
  }

  ngOnInit(): void {
    if(this.paginationModel == null || this.paginationModel == undefined){
      throw new Error('Object of type IPaginationModel is expected for paginationModel');
    }

    this.cardHeader = this.paginationModel == undefined? '' : this.paginationModel.tableCardHeader;

    let collumnLabels = Object.keys(this.paginationModel.tableMaping);
    console.log(this.paginationModel.tableMaping[collumnLabels[0]])

    this.paginationModel.sourceData.forEach(element => {
      console.log(typeof(element));
    });

    this.config = {
      allowDelete: this.paginationModel == undefined? false : this.paginationModel.allowDelete,
      allowEdit: this.paginationModel == undefined? false : this.paginationModel.allowEdit,
      isEditableTable: this.paginationModel == undefined? false : this.paginationModel.isEditableTable,
      columnNames: collumnLabels,
      sourceData: []
    };
  }
}
