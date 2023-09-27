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
  NbTabsetModule,
  NbUserModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './settings/ProductManagement/category/category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './CRM/customers/customers.component';
import { AddPurchaseComponent } from './BusinessOperations/purchase/add-purchase/add-purchase.component';
import { PurchaseComponent } from './BusinessOperations/purchase/purchase.component';
import { SellComponent } from './BusinessOperations/sell/sell.component';
import { AddSalesComponent } from './BusinessOperations/sell/add-sales/add-sales.component';
import { ProductsComponent } from './settings/ProductManagement/products/products.component';
import { ProductsDetailsFormComponent } from './settings/ProductManagement/products/products-details-form/products-details-form.component';
import { PlatformsettingsComponent } from './platformsettings/platformsettings.component';
import { RouteFormComponent } from './platformsettings/route-form/route-form.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { GeneralSettingsComponent } from './settings/general-settings/general-settings.component';
import { RoleManagementComponent } from './settings/general-settings/role-management/role-management.component';
import { UmsComponent } from './settings/general-settings/ums/ums.component';
import { UserFormComponent } from './settings/general-settings/ums/user-form/user-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ProductsComponent,
    CategoryComponent,
    ProductsDetailsFormComponent,
    PurchaseComponent,
    AddPurchaseComponent,
    SellComponent,
    AddSalesComponent,
    GeneralSettingsComponent,
    RoleManagementComponent,
    UmsComponent,
    UserFormComponent,
    CustomersComponent,
    PlatformsettingsComponent,
    RouteFormComponent,
    OnboardingComponent,
    GeneralSettingsComponent
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
    NbUserModule,
    ReactiveFormsModule,
    FormsModule // <--- import into the NgModule
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
