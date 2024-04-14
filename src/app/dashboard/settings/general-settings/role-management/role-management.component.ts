import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { OrganizationModel } from 'src/app/dashboard/Models/organization.model';
import { IRoleModel } from 'src/app/dashboard/Models/IRoleModel';
import { IRouteModel } from 'src/app/dashboard/Models/IRouteModel';
import { IRoutePermissionModel } from 'src/app/dashboard/Models/IRoutePermissionModel';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { OrganizationService } from 'src/app/dashboard/services/organization.service';
import { RoleService } from 'src/app/dashboard/services/role.service';
import { RouteService } from 'src/app/dashboard/services/route.service';
import { AddDialogueComponent } from 'src/app/shared/ngx-dialogues/add-dialogue/add-dialogue.component';
import { RemoveDialogueComponent } from 'src/app/shared/ngx-dialogues/remove-dialogue/remove-dialogue.component';
import { RoleFormComponent } from './role-form/role-form.component';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})

export class RoleManagementComponent {
  @Input() ownedBusinesses: OrganizationModel[];
  rolesUnderThisBusiness: IRoleModel[];
  roleRouteMapping: IRoutePermissionModel[];

  selectedRoleId: number = 0;
  selectedBusinessId: number = 0;

  constructor(
    private chageDetector: ChangeDetectorRef,
    private toastrService: NbToastrService,
    private windowService: NbWindowService,
    private businessService: OrganizationService,
    private routeService: RouteService,
    private roleService: RoleService
  ) {
    this.roleRouteMapping = [];
    this.rolesUnderThisBusiness = [];
  }

  // Organization / Business management
  openSaveBusinessWindow(windowMessage: string, businessModel: OrganizationModel | null) {
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

        textValue: businessModel?.organizationName
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
                organizationId: element.organizationId,
                roleId: element.roleId,
                roleName: element.roleName,
                isAdmin: element.isAdmin
            });
        });

        this.chageDetector.detectChanges();
      });
  }

  openSaveRoleWindow(windowMessage: string, roleModel: IRoleModel | null) {
    this.windowService.open(RoleFormComponent, {
      title: windowMessage,
      buttons: {
        close: false,
        fullScreen: true,
        maximize: true,
        minimize: true
      },
      context: {
        roleName: roleModel?.roleName,
        isAdminRole: roleModel?.isAdmin,
        saveMethod: (roleTitle: string, isAdminRole: boolean) => {
          let observableObj;
          if(roleModel) {
            roleModel.roleName = roleTitle;
            roleModel.isAdmin = isAdminRole;
            observableObj = this.roleService.updateRole(roleModel);
          } else {
            observableObj = this.roleService.addRole({
              roleId: 0,
              organizationId: this.selectedBusinessId,
              roleName: roleTitle,
              isAdmin: isAdminRole
            });
          }

          observableObj.subscribe((response) => {
            let isNewlyAdded: boolean = true;
            for(let i = 0; i < this.rolesUnderThisBusiness.length; i++){
              // Update existing record
              if(this.rolesUnderThisBusiness[i].roleId == response.roleId){
                isNewlyAdded = false;
                this.rolesUnderThisBusiness[i] = {
                  organizationId: response.organizationId,
                  roleId : response.roleId,
                  roleName: response.roleName,
                  isAdmin: response.isAdmin
                };
              }
            }

            // Append newly added record
            if(isNewlyAdded){
              this.rolesUnderThisBusiness.push({
                roleId : response.roleId,
                roleName: response.roleName,
                organizationId: response.organizationId,
                isAdmin: response.isAdmin
              });
            }

            this.chageDetector.detectChanges();
            this.toastrService.success('Saved Successfully', 'Success');
          });
        }
      }
    });
  }

  openDeleteRoleWindow(windowMessage: string, roleId: number) {
    // Load pop up dialogue
    // let windowRef = this.windowService.open(RemoveDialogueComponent, {
    this.windowService.open(RemoveDialogueComponent, {
      title: windowMessage,
      buttons: {
        close: false,
        fullScreen: true,
        maximize: true,
        minimize: true
      },
      context: {
        deleteMethod: () => {
          this.roleService.deleteRole(roleId)
            .subscribe(() => {
              let filteredList = this.rolesUnderThisBusiness.filter(x => x.roleId != roleId);
              this.rolesUnderThisBusiness = filteredList;
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

  findLeafNodes(nodes: IRouteModel[]): IRouteModel[] {
    let parentIds = nodes.map(node => node.parentRouteId);
    return nodes.filter(node => !parentIds.includes(node.routeId));
  }

  loadRoleRoutes(roleId: any): void{
    this.roleRouteMapping = [];
    this.selectedRoleId = roleId;
    this.routeService.getAllRoute()
      .subscribe((appRoutes) => {
        this.routeService.getRoutesByRole(roleId)
          .subscribe((allowedRoutes) => {
            let allowedRouteIds: number[] = allowedRoutes.map(x => x.routeId);

            appRoutes = this.findLeafNodes(appRoutes);

            appRoutes.forEach(route => {
              this.roleRouteMapping.push({
                routeId: route.routeId,
                routeName: route.routeName,
                isPermitted: allowedRouteIds.includes(route.routeId)
              });
            });


            this.chageDetector.detectChanges();
          });
      });
  }

  allowRouteToRole(routeId: number): void{
    this.roleService.mapRolesWithRoute(this.selectedRoleId, routeId)
    .subscribe(() => {
      this.toastrService.success('Route mapped successfully', 'Success');
    });
  }
}
