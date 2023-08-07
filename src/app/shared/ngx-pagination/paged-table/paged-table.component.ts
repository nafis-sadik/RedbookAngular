import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ITableModel } from '../Models/ITableModel';
import { elements } from 'chart.js';

@Component({
  selector: 'ngx-paged-table',
  templateUrl: './paged-table.component.html',
  styleUrls: ['./paged-table.component.scss'],
})
export class PagedTableComponent{
  @Input() config: ITableModel;

  constructor(private renderer:Renderer2,) {
    this.config = {
      isEditableTable: false,
      columnNames: new Array<string>(),
      sourceData: new Array<Array<any>>(),
      onEdit: null,
      onDelete: null,
      onView:null,
      actionColWidth:'',
    };
  }

  ngAfterViewInit(): void {
    let column = Array.from(document.getElementsByClassName('table-actions'));
    // Use Renderer2 to set the CSS style dynamically
    column.forEach(row => {
      this.renderer.setStyle(row, 'width', this.config.actionColWidth);
    });
  }

}
