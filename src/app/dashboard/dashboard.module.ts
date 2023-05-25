import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
  NbStepperModule,
  NbTabsetModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { RemoveCategoryComponent } from './category/remove-category/remove-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsDetailsFormComponent } from './products/products-details-form/products-details-form.component';
import { SellComponent } from './sell/sell.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AddPurchaseComponent } from './purchase/add-purchase/add-purchase.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ProductsComponent,
    CategoryComponent,
    AddCategoryComponent,
    RemoveCategoryComponent,
    ProductsDetailsFormComponent,
    SellComponent,
    PurchaseComponent,
    AddPurchaseComponent,
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
    NbStepperModule,
    NbButtonGroupModule,
    NbTabsetModule,
    SharedModule,
    NbDatepickerModule,
    NbCheckboxModule
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
