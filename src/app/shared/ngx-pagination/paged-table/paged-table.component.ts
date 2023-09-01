import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ITableModel } from '../Models/ITableModel';

@Component({
  selector: 'ngx-paged-table',
  templateUrl: './paged-table.component.html',
  styleUrls: ['./paged-table.component.scss'],
})
export class PagedTableComponent implements OnInit{
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

  ngOnInit(): void {
    let column = Array.from(document.getElementsByClassName('table-actions'));
    
    // Use Renderer2 to set the CSS style dynamically
    column.forEach(row => {
      this.renderer.setStyle(row, 'width', this.config.actionColWidth);
    });
  }

  edit(){
    if(this.config.onEdit && typeof(this.config.onEdit) == 'function')
      this.config.onEdit(this.config);
  }

  onView(){
    if(this.config.onView && typeof(this.config.onView) == 'function')
      this.config.onView(this.config)
  }

  onDelete(){
    if(this.config.onDelete && typeof(this.config.onDelete) == 'function')
      this.config.onDelete(this.config)
  }
}
