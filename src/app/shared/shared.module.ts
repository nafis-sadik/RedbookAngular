import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
} from '@nebular/theme';
import { NgxPaginationComponent } from './ngx-pagination/ngx-pagination.component';
import { PagedTableComponent } from './ngx-pagination/paged-table/paged-table.component';
// import { PaginationComponent } from './ngx-pagination/pagination/pagination.component';
// import { SearchComponent } from './ngx-pagination/search/search.component';
import { AddNewComponent } from './ngx-pagination/add-new/add-new.component';
import { AddDialogueComponent } from './ngx-dialogues/add-dialogue/add-dialogue.component';
import { RemoveDialogueComponent } from './ngx-dialogues/remove-dialogue/remove-dialogue.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    // PaginationComponent,
    PagedTableComponent,
    NgxPaginationComponent,
    // SearchComponent,
    AddNewComponent,
    AddDialogueComponent,
    RemoveDialogueComponent,
    NotFoundComponent,
  ],
  imports: [
    NbCardModule,
    CommonModule,
    NbIconModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
  ],
  exports: [NgxPaginationComponent, CommonModule, FormsModule],
})
export class SharedModule {}
