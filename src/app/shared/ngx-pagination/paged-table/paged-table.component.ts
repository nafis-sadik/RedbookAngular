import { Component, Input, OnInit } from '@angular/core';
import { ITableModel } from '../Models/ITableModel';

@Component({
  selector: 'ngx-paged-table',
  templateUrl: './paged-table.component.html',
  styleUrls: ['./paged-table.component.scss']
})
export class PagedTableComponent implements OnInit {
  @Input() config: ITableModel;

  constructor(){
    this.config = {
      isEditableTable: false,
      allowDelete: false,
      allowEdit: false,
      columnNames: new Array<string>,
      sourceData: new Array<Array<any>>
    }
  }
  ngOnInit(): void { }
}
