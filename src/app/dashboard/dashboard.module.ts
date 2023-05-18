import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbMenuModule, NbRadioModule, NbSelectModule, NbSidebarModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { RemoveCategoryComponent } from './category/remove-category/remove-category.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ProductsComponent,
    CategoryComponent,
    AddCategoryComponent,
    RemoveCategoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    DashboardRoutingModule,
    NbInputModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
    NbIconModule,
    NbListModule,
    NbSelectModule,
    NbRadioModule,
    NbButtonGroupModule,
    Ng2SmartTableModule
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
