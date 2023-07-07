import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { IBusinessModel } from '../../Models/IBusinessModel';
import { IRoleModel } from '../../Models/IRoleModel';
import { IRoutePermissionModel } from '../../Models/IRoutePermissionModel';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent {
  ownedBusinesses: IBusinessModel[];
  rolesUnderThisBusiness: IRoleModel[];
  routesCollection: IRoutePermissionModel[];

  selectedRoleId: number = 0;
  selectedBusinessId: number = 0;

  constructor(private dashboardService: DashboardService) {
    this.rolesUnderThisBusiness = [];
    this.routesCollection = [];
    this.ownedBusinesses = dashboardService.getOutlets();
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

    this.selectedBusinessId = businessId;
  }

  loadPermissionsAgainstRole(roleId: number): void{
    this.selectedRoleId = roleId;
    this.routesCollection = this.dashboardService.getRoutePermissions(roleId);
  }

  allowRouteToRole(routeId: number): void{
    console.log('Business Id: ' + this.selectedBusinessId + ' Role Id: ' + this.selectedRoleId + ' Selected Route Id ' + routeId);
  }
}
