import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { IBusinessModel } from '../Models/IBusinessModel';
import { IRoleModel } from '../Models/IRoleModel';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { IRoutePermissionModel } from '../Models/IRoutePermissionModel';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor() { }
}
