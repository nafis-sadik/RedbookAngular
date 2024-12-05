import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerRoutingModule } from './retailer-routing.module';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { NbCardModule, NbStepperModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ OnboardingComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbCardModule,
    RetailerRoutingModule,
    SharedModule
  ]
})
export class RetailerModule { }
