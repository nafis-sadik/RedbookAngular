import { Component } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { IOrganizationModel } from '../../Models/IOrganizationModel';
import { IRoleModel } from '../../Models/IRoleModel';
import { IRoutePermissionModel } from '../../Models/IRoutePermissionModel';
import { AddDialogueComponent } from '../../../shared/ngx-dialogues/add-dialogue/add-dialogue.component';
import { RemoveDialogueComponent } from '../../../shared/ngx-dialogues/remove-dialogue/remove-dialogue.component';
import { NbToastrService, NbWindowService } from '@nebular/theme';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})

export class RoleManagementComponent {
  ownedBusinesses: IOrganizationModel[];
  rolesUnderThisBusiness: IRoleModel[];
  routesCollection: IRoutePermissionModel[];

  selectedRoleId: number = 0;
  selectedBusinessId: number = 0;

  constructor(private dashboardService: DashboardService, private windowService: NbWindowService, private toastrService: NbToastrService) {
    this.rolesUnderThisBusiness = [];
    this.routesCollection = [];
    this.ownedBusinesses = dashboardService.getOutlets();
  }

  loadRolesBusiness(businessId: number): void{
    if(businessId == 1){
      this.rolesUnderThisBusiness = [
        {
          RoleId: 1,
          RoleName: 'Sales Admin',
          BusinessId: 1
        },
        {
          RoleId: 2,
          RoleName: 'CRM Admin',
          BusinessId: 1
        },
        {
          RoleId: 4,
          RoleName: 'Inventory Admin',
          BusinessId: 1
        },
        {
          RoleId: 5,
          RoleName: 'System Admin',
          BusinessId: 1
        },
      ];
    }
    else
    {
      this.rolesUnderThisBusiness = [
        {
          RoleId: 5,
          RoleName: 'System Admin',
          BusinessId: 2
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

  openSaveBusinessWindow(windowMessage: string, businessModel: IOrganizationModel | null) {
    let url: string;
    let method: string;
    let toasterMsg: string = '';

    // If UI sent an object, it's an update operation
    // Otherwise it's an incertion operation
    let windowRef = this.windowService.open(AddDialogueComponent, {
      title: windowMessage,
      buttons: {
        close: false,
        fullScreen: true,
        maximize: true,
        minimize: true
      }
    });

    windowRef.onClose.subscribe((businessTitle) => {
      // If user closes the window without saving anything, we do not need to process anything
      // First if shields against that
      if (businessTitle != undefined && businessTitle != null) {
        // If user used update button, businessModel brought the stock object for us
        // If the user used create button, businessModel shall remain null
        if (businessModel == null) {
          method = 'POST';
          toasterMsg = 'Saved Successfully';
          businessModel = { organizationName: businessTitle, organizationId: 0, address: null };
        } else {
          method = 'PUT';
          toasterMsg = 'Updated Successfully';
          businessModel.organizationName = businessTitle;
        }

        // Replace the console logs with http request bellow
        // Calling the backend API when pre processing is ready
        console.log('URL', url);
        console.log('Method', method);
        console.log('Body', businessModel);
        this.toastrService.success(toasterMsg, 'Success');
      }
    });
  }

  openDeleteBusinessWindow(windowMessage: string, businessId: number) {
    // Load pop up dialogue
    let windowRef = this.windowService.open(RemoveDialogueComponent, {
      title: windowMessage,
      buttons: {
        close: false,
        fullScreen: true,
        maximize: true,
        minimize: true
      },
    });

    // Remove element
    windowRef.onClose.subscribe((deleteEntry) => {
      if (deleteEntry) {
        this.ownedBusinesses.filter(element => {
          if (element.organizationId == businessId) {
            let index = this.ownedBusinesses.indexOf(element);
            this.ownedBusinesses.splice(index);
            return;
          }
        });
      }
    });
  }
}
