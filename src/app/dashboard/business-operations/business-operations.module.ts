import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { BusinessOperationsRoutingModule } from './business-operations-routing.module';
import { BusinessOperationsComponent } from './business-operations.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule, NbOptionModule, NbRadioModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbTooltipModule } from '@nebular/theme';
import { PurchaseDetailsComponent } from './purchase/purchase-details/purchase-details.component';
import { AddPurchaseComponent } from './purchase/add-purchase/add-purchase.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorsComponent } from './vendors/vendors.component';
import { AddVendorsComponent } from './vendors/add-vendors/add-vendors.component';
import { SalesComponent } from './sales/sales.component';
import { AddSalesComponent } from './sales/add-sales/add-sales.component';


@NgModule({
  declarations: [
    VendorsComponent,
    AddVendorsComponent,
    PurchaseComponent,
    AddPurchaseComponent,
    PurchaseDetailsComponent,
    SalesComponent,
    AddSalesComponent,
    BusinessOperationsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    SharedModule,
    NbAccordionModule,
    NbIconModule,
    NbListModule,
    NbRadioModule,
    NbButtonModule,
    NbInputModule,
    NbTooltipModule,
    NbTabsetModule,
    NbStepperModule,
    NbDatepickerModule,
    NbOptionModule,
    NbSelectModule,
    BusinessOperationsRoutingModule
  ]
})

export class BusinessOperationsModule { }
