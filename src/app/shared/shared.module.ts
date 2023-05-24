import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { NgxPaginationComponent } from './ngx-pagination/ngx-pagination.component';
import { PagedTableComponent } from './ngx-pagination/paged-table/paged-table.component';
import { PaginationComponent } from './ngx-pagination/pagination/pagination.component';
import { SearchComponent } from './ngx-pagination/search/search.component';
import { AddNewComponent } from './ngx-pagination/add-new/add-new.component';



@NgModule({
  declarations: [
    PaginationComponent,
    PagedTableComponent,
    NgxPaginationComponent,
    SearchComponent,
    AddNewComponent
  ],
  imports: [
    NbCardModule,
    CommonModule,
    NbIconModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule
  ],
  exports: [
    NgxPaginationComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
