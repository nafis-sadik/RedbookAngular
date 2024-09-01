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
  NbUserModule,
  NbToggleModule,
  NbTooltipModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './settings/ProductManagement/product-settings/category/category.component';
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
import { RoleFormComponent } from './settings/general-settings/role-management/role-form/role-form.component';
import { ProductSettingsComponent } from './settings/ProductManagement/product-settings/product-settings.component';
import { QuantityUnitComponent } from './settings/ProductManagement/product-settings/quantity-unit/quantity-unit.component';
import { VendorsComponent } from './BusinessOperations/vendors/vendors.component';
import { AddVendorsComponent } from './BusinessOperations/vendors/add-vendors/add-vendors.component';
import { RouteSettingsComponent } from './platformsettings/route-settings/route-settings.component';

@NgModule({
  declarations: [
    UmsComponent,
    SellComponent,
    HomeComponent,
    RoleFormComponent,
    PurchaseComponent,
    ProductsComponent,
    CategoryComponent,
    UserFormComponent,
    AddSalesComponent,
    DashboardComponent,
    RouteFormComponent,
    CustomersComponent,
    OnboardingComponent,
    AddPurchaseComponent,
    RoleManagementComponent,
    GeneralSettingsComponent,
    GeneralSettingsComponent,
    ProductSettingsComponent,
    PlatformsettingsComponent,
    ProductsDetailsFormComponent,
    QuantityUnitComponent,
    VendorsComponent,
    AddVendorsComponent,
    RouteSettingsComponent
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
    NbToggleModule,
    ReactiveFormsModule,
    NbTooltipModule,
    FormsModule // <--- import into the NgModule
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
