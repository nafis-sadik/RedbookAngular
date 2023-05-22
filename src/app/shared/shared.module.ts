import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { NgxPaginationComponent } from './ngx-pagination/ngx-pagination.component';
import { PagedTableComponent } from './ngx-pagination/paged-table/paged-table.component';
import { PaginationComponent } from './ngx-pagination/pagination/pagination.component';



@NgModule({
  declarations: [
    PaginationComponent,
    PagedTableComponent,
    NgxPaginationComponent
  ],
  imports: [
    NbCardModule,
    CommonModule,
    NbIconModule
  ],
  exports: [
    NgxPaginationComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
