import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { NbIconModule } from '@nebular/theme';



@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    NbIconModule
  ],
  exports: [
    PaginationComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
