import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { CustomersComponent } from './CRM/customers/customers.component';
import { SellComponent } from './BusinessOperations/sell/sell.component';
import { PurchaseComponent } from './BusinessOperations/purchase/purchase.component';
import { ProductsComponent } from './settings/ProductManagement/products/products.component';
import { PlatformsettingsComponent } from './platformsettings/platformsettings.component';
import { GeneralSettingsComponent } from './settings/general-settings/general-settings.component';
import { ProductSettingsComponent } from './settings/ProductManagement/product-settings/product-settings.component';
import { VendorsComponent } from './BusinessOperations/vendors/vendors.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'products',
      component: ProductsComponent
    },
    {
      path: 'product-settings',
      component: ProductSettingsComponent
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
      component: GeneralSettingsComponent
    },
    {
      path: 'customers',
      component: CustomersComponent
    },
    {
      path: 'onboarding',
      component: OnboardingComponent
    },
    {
      path: 'platform-settings',
      component: PlatformsettingsComponent
    },
    {
      path: 'vendors',
      component: VendorsComponent
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DashboardRoutingModule { }
