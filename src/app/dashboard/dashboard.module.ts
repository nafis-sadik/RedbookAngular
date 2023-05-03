import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    DashboardRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
    NbIconModule,
    NbSelectModule
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
