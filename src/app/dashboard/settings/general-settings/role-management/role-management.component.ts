import { ChangeDetectorRef, Component } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { IOrganizationModel } from 'src/app/dashboard/Models/IOrganizationModel';
import { IRoleModel } from 'src/app/dashboard/Models/IRoleModel';
import { IRoutePermissionModel } from 'src/app/dashboard/Models/IRoutePermissionModel';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { OrganizationService } from 'src/app/dashboard/services/organization.service';
import { AddDialogueComponent } from 'src/app/shared/ngx-dialogues/add-dialogue/add-dialogue.component';
import { RemoveDialogueComponent } from 'src/app/shared/ngx-dialogues/remove-dialogue/remove-dialogue.component';

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

  constructor(
    private chageDetector: ChangeDetectorRef,
    private toastrService: NbToastrService,
    private windowService: NbWindowService,
    private dashboardService: DashboardService,
    private businessService: OrganizationService,
  ) {
    this.ownedBusinesses = [];
    this.routesCollection = [];
    this.rolesUnderThisBusiness = [];
    dashboardService.getOutlets()
      .subscribe(response => {
        for(let i = 0; i < response.length; i++){
          this.ownedBusinesses.push({
            organizationId: response[i].organizationId,
            organizationName: response[i].organizationName,
            address: []
          });
        }
      })
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
    let toasterMsg = 'Saved Successfully';
    this.windowService.open(AddDialogueComponent, {
      title: windowMessage,
      buttons: {
        close: false,
        fullScreen: true,
        maximize: true,
        minimize: true
      },
      context: {
        saveMethod: (businessTitle: string) => {
          let observableObj;
          if(businessModel) {
            businessModel.organizationName = businessTitle;
            observableObj = this.businessService.updateOrganization(businessModel);
          } else {
            observableObj = this.businessService.addNewOrganization({
              organizationId: 0,
              organizationName: businessTitle,
              address: []
            });
          }
          observableObj.subscribe((response) => {
            for(let i = 0; i < this.ownedBusinesses.length; i++){
              if(this.ownedBusinesses[i].organizationId == response.organizationId){
                this.ownedBusinesses[i] = response;
              }
            }
            this.chageDetector.detectChanges();
            this.toastrService.success(toasterMsg, 'Success');
          })
        },
        businessTitle: businessModel?.organizationName
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
