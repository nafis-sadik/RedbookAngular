import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { IBusinessModel } from '../Models/IBusinessModel';
import { IRoleModel } from '../Models/IRoleModel';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  ownedBusinesses: IBusinessModel[];
  rolesUnderThisBusiness: IRoleModel[];
  pagedRoleModel: IPaginationModel<IRoleModel>;

  constructor(
    private dashboardService: DashboardService,
    private ngxPaginationService: NGXPaginationService<IRoleModel>
  ) {
    this.rolesUnderThisBusiness = [];
    this.ownedBusinesses = dashboardService.getOutlets();
    this.pagedRoleModel = dashboardService.getPagingConfig(null, 'User Management', 'Add User', 'Search User');
    if(this.pagedRoleModel.tableConfig){
      this.pagedRoleModel.tableConfig.tableMaping = {
        "Role Id": "RoleId",
        "Role Name": "RoleName"
      };

      this.pagedRoleModel.tableConfig.onEdit = () => {}
      this.pagedRoleModel.tableConfig.onDelete = () => {}
    }
  }

  loadRolesBusiness(businessId: number): void{
    console.log(businessId);
  }
}
