import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ITableConfig } from '../Models/ITableConfig';

@Component({
  selector: 'ngx-paged-table',
  templateUrl: './paged-table.component.html',
  styleUrls: ['./paged-table.component.scss']
})
export class PagedTableComponent {
  @Input() config: ITableConfig;

  constructor(){
    this.config = {
      isEditableTable: false,
      allowDelete: false,
      allowEdit: false,
      columnNames: [],
      sourceData: []
    }
  }
}
