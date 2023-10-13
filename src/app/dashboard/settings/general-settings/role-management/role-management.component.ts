import { ChangeDetectorRef, Component } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { IOrganizationModel } from 'src/app/dashboard/Models/IOrganizationModel';
import { IRoleModel } from 'src/app/dashboard/Models/IRoleModel';
import { IRoutePermissionModel } from 'src/app/dashboard/Models/IRoutePermissionModel';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { OrganizationService } from 'src/app/dashboard/services/organization.service';
import { RoleService } from 'src/app/dashboard/services/role.service';
import { RouteService } from 'src/app/dashboard/services/route.service';
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
    private routeService: RouteService,
    private roleService: RoleService
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

  // Organization / Business management
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
            let isNewlyAdded = true;
            for(let i = 0; i < this.ownedBusinesses.length; i++){
              if(this.ownedBusinesses[i].organizationId == response.organizationId){
                isNewlyAdded = false;
                this.ownedBusinesses[i] = response;
              }
            }

            if(isNewlyAdded){
              this.ownedBusinesses.push(response);
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
      context: {
        deleteMethod: () => {
          this.businessService.deleteOrganization(businessId)
            .subscribe(() => {
              let filteredList = this.ownedBusinesses.filter(x => x.organizationId != businessId);
              this.ownedBusinesses = filteredList;
              this.chageDetector.detectChanges();
            });
        }
      }
    });

    // Remove element
    // windowRef.onClose.subscribe((deleteEntry) => {
    //   if (deleteEntry) {
    //     this.ownedBusinesses.filter(element => {
    //       if (element.organizationId == businessId) {
    //         let index = this.ownedBusinesses.indexOf(element);
    //         this.ownedBusinesses.splice(index);
    //         return;
    //       }
    //     });
    //   }
    // });
  }

  // Role Management
  loadBusinessRoles(businessId: number): void{
    this.selectedBusinessId = businessId;
    this.roleService.getOrganizationRoles(businessId)
      .subscribe((response) => {
        this.rolesUnderThisBusiness = [];              
        response.forEach(element => {
          this.rolesUnderThisBusiness.push({
                OrganizationId: element.organizationId,
                RoleId: element.roleId,
                RoleName: element.roleName
            });
        });
        
        this.chageDetector.detectChanges();
      });
  }

  openSaveRoleWindow(windowMessage: string, roleModel: IRoleModel | null) {
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
        saveMethod: (roleTitle: string) => {
          let observableObj;
          if(roleModel) {
            roleModel.RoleName = roleTitle;
            observableObj = this.roleService.updateRole(roleModel);
          } else {
            observableObj = this.roleService.addRole({
              RoleId: 0,
              OrganizationId: this.selectedBusinessId,
              RoleName: roleTitle
            });
          }

          observableObj.subscribe((response) => {
            let isNewlyAdded = true;
            for(let i = 0; i < this.rolesUnderThisBusiness.length; i++){
              if(this.rolesUnderThisBusiness[i].RoleId == response.RoleId){
                isNewlyAdded = false;
                this.rolesUnderThisBusiness[i] = {
                  RoleId : response.roleId,
                  RoleName: response.roleName,
                  OrganizationId: response.organizationId
                };
              }
            }
            
            if(isNewlyAdded){
              this.rolesUnderThisBusiness.push({
                RoleId : response.roleId,
                RoleName: response.roleName,
                OrganizationId: response.organizationId
              });
            }

            this.chageDetector.detectChanges();
            this.toastrService.success(toasterMsg, 'Success');
          });
        }
      }
    });
  }

  loadRoleRoutes(roleId: any): void{
    this.selectedRoleId = roleId;
    this.routesCollection = this.dashboardService.getRoutePermissions(roleId);
    this.routeService.getRoutesByRole(roleId)
      .subscribe((response) => {
        console.log(response)
      });
  }

  allowRouteToRole(routeId: number): void{
    console.log('Business Id: ' + this.selectedBusinessId + ' Role Id: ' + this.selectedRoleId + ' Selected Route Id ' + routeId);
  }
}
