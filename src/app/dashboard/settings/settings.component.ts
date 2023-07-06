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

  selectedRoleId: number = 0;

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
    if(businessId == 1){
      this.rolesUnderThisBusiness = [
        {
          RoleId: 1,
          RoleName: 'Sales Admin'
        },
        {
          RoleId: 2,
          RoleName: 'CRM Admin'
        },
        {
          RoleId: 4,
          RoleName: 'Inventory Admin'
        },
        {
          RoleId: 5,
          RoleName: 'System Admin'
        },
      ];
    }
    else
    {
      this.rolesUnderThisBusiness = [
        {
          RoleId: 5,
          RoleName: 'System Admin'
        }
      ]
    }
  }

  loadPermissionsAgainstRole(roleId: number): void{
    this.selectedRoleId = roleId;
  }
}
