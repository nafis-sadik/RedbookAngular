import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './settings/ProductManagement/category/category.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './CRM/customers/customers.component';
import { SellComponent } from './BusinessOperations/sell/sell.component';
import { PurchaseComponent } from './BusinessOperations/purchase/purchase.component';
import { ProductsComponent } from './settings/ProductManagement/products/products.component';
import { PlatformsettingsComponent } from './platformsettings/platformsettings.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { GeneralSettingsComponent } from './settings/general-settings/general-settings.component';

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
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DashboardRoutingModule { }
