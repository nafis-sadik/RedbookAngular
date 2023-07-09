import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import {
  NbAccordionModule,
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
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsDetailsFormComponent } from './products/products-details-form/products-details-form.component';
import { SellComponent } from './sell/sell.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AddPurchaseComponent } from './purchase/add-purchase/add-purchase.component';
import { FormsModule } from '@angular/forms';
import { AddSalesComponent } from './sell/add-sales/add-sales.component';
import { SettingsComponent } from './settings/settings.component';
import { RoleManagementComponent } from './settings/role-management/role-management.component';
import { UmsComponent } from './settings/ums/ums.component';
import { UserFormComponent } from './settings/ums/user-form/user-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ProductsComponent,
    CategoryComponent,
    ProductsDetailsFormComponent,
    SellComponent,
    PurchaseComponent,
    AddPurchaseComponent,
    AddSalesComponent,
    SettingsComponent,
    RoleManagementComponent,
    UmsComponent,
    UserFormComponent
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
    NbCheckboxModule,
    NbAccordionModule,
    FormsModule // <--- import into the NgModule
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
