import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './settings/ProductManagement/category/category.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { CustomersComponent } from './CRM/customers/customers.component';
import { SellComponent } from './BusinessOperations/sell/sell.component';
import { PurchaseComponent } from './BusinessOperations/purchase/purchase.component';
import { ProductsComponent } from './settings/ProductManagement/products/products.component';
import { RetailerComponent } from './retailer/retailer.component';
import { PlatformsettingsComponent } from './platformsettings/platformsettings.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'products',
      component: ProductsComponent
    },
    {
      path: 'category',
      component: CategoryComponent
    },
    {
      path: 'sales',
      component: SellComponent
    },
    {
      path: 'purchase',
      component: PurchaseComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: 'customers',
      component: CustomersComponent
    },
    {
      path: 'retailer',
      component: RetailerComponent
    },
    {
      path: 'platform-settings',
      component: PlatformsettingsComponent
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DashboardRoutingModule { }
