import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { NbAccordionModule, NbButton, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbTooltipModule } from '@nebular/theme';
import { ProductManagementComponent } from './product-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductSettingsComponent } from './product-settings/product-settings.component';
import { QuantityUnitComponent } from './product-settings/quantity-unit/quantity-unit.component';
import { CategoryComponent } from './product-settings/category/category.component';


@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductsComponent,
    ProductSettingsComponent,
    QuantityUnitComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    NbCardModule,
    SharedModule,
    NbAccordionModule,
    NbIconModule,
    NbListModule,
    NbRadioModule,
    NbButtonModule,
    NbInputModule,
    NbTooltipModule
  ]
})
export class ProductManagementModule { }
