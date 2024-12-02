import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { CustomersComponent } from './CRM/customers/customers.component';
import { SellComponent } from './BusinessOperations/sell/sell.component';
import { PurchaseComponent } from './BusinessOperations/purchase/purchase.component';
import { PlatformsettingsComponent } from './platformsettings/platformsettings.component';
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
      path: 'sales',
      component: SellComponent
    },
    {
      path: 'purchase',
      component: PurchaseComponent
    },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
    },
    {
      path: 'products',
      loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule)
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
