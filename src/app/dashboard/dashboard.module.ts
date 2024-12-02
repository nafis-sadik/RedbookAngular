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
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './CRM/customers/customers.component';
import { AddPurchaseComponent } from './BusinessOperations/purchase/add-purchase/add-purchase.component';
import { PurchaseComponent } from './BusinessOperations/purchase/purchase.component';
import { SellComponent } from './BusinessOperations/sell/sell.component';
import { AddSalesComponent } from './BusinessOperations/sell/add-sales/add-sales.component';
import { PlatformsettingsComponent } from './platformsettings/platformsettings.component';
import { RouteFormComponent } from './platformsettings/route-form/route-form.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { RoleManagementComponent } from './settings/role-management/role-management.component';
import { UmsComponent } from './settings/ums/ums.component';
import { UserFormComponent } from './settings/ums/user-form/user-form.component';
import { RoleFormComponent } from './settings/role-management/role-form/role-form.component';
import { VendorsComponent } from './BusinessOperations/vendors/vendors.component';
import { AddVendorsComponent } from './BusinessOperations/vendors/add-vendors/add-vendors.component';
import { RouteSettingsComponent } from './platformsettings/route-settings/route-settings.component';
import { PurchaseDetailsComponent } from './BusinessOperations/purchase/purchase-details/purchase-details.component';

@NgModule({
  declarations: [
    UmsComponent,
    SellComponent,
    HomeComponent,
    RoleFormComponent,
    PurchaseComponent,
    UserFormComponent,
    AddSalesComponent,
    DashboardComponent,
    RouteFormComponent,
    CustomersComponent,
    OnboardingComponent,
    AddPurchaseComponent,
    RoleManagementComponent,
    PlatformsettingsComponent,
    VendorsComponent,
    AddVendorsComponent,
    PurchaseDetailsComponent,
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
