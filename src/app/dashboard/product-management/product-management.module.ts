import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { NbAccordionModule, NbButton, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbTooltipModule } from '@nebular/theme';
import { ProductManagementComponent } from './product-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductSettingsComponent } from './product-settings/product-settings.component';
import { QuantityUnitComponent } from './product-settings/quantity-unit/quantity-unit.component';
import { CategoryComponent } from './product-settings/category/category.component';
import { ProductsDetailsFormComponent } from './products/products-details-form/products-details-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductsDetailsFormComponent,
    ProductsComponent,
    ProductSettingsComponent,
    QuantityUnitComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductManagementRoutingModule,
    NbCardModule,
    SharedModule,
    NbAccordionModule,
    NbIconModule,
    NbListModule,
    NbRadioModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbTooltipModule
  ]
})

export class ProductManagementModule { }
