import { Component, Input } from '@angular/core';
import { IOrganizationModel } from 'src/app/dashboard/Models/IOrganizationModel';
import { IUserModel } from 'src/app/dashboard/Models/IUserModel';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { UserFormComponent } from './user-form/user-form.component';
import { NbDialogService } from '@nebular/theme';
import { OrganizationService } from 'src/app/dashboard/services/organization.service';

@Component({
  selector: 'app-ums',
  templateUrl: './ums.component.html',
  styleUrls: ['./ums.component.scss']
})
export class UmsComponent {
  selectedBusinessId: number;
  pagedUserModel: IPaginationModel<IUserModel>;
  @Input() ownedBusinesses: IOrganizationModel[];

  constructor(
    dashboardService: DashboardService,
    private orgService: OrganizationService,
    private dialogService: NbDialogService,
    private ngxPaginationService: NGXPaginationService<IUserModel>
  ) {
    this.pagedUserModel = dashboardService.getPagingConfig(UserFormComponent, 'User Management', 'Add User', 'Search User');

    if(this.pagedUserModel.pagingConfig){
      // To be called manually for updating UI 
      this.pagedUserModel.pagingConfig.onUpdate = (pagingInfo: any) => {
        if(this.pagedUserModel.pagingConfig){
          this.pagedUserModel.pagingConfig.pageLength = pagingInfo.pageLength;
          this.pagedUserModel.pagingConfig.PageNumber = pagingInfo.pageNumber;
          this.pagedUserModel.pagingConfig.totalItems = pagingInfo.totalItems;

          this.ngxPaginationService.set(this.pagedUserModel);
        }
      }

      // Dropdown change event binding
      this.pagedUserModel.pagingConfig.onUpdate = () => {
        this.orgService.getUserByBusinessId(this.pagedUserModel, this.selectedBusinessId)
          .subscribe((response) => {
            if(this.pagedUserModel.tableConfig == null) return;
            if(this.pagedUserModel.pagingConfig == null) return;
            if(this.pagedUserModel.searchingConfig == null) return;
            
            this.pagedUserModel.searchingConfig.searchString = response.searchString;
            this.pagedUserModel.tableConfig.sourceData = response.sourceData;

            if(this.pagedUserModel.pagingConfig){
              this.pagedUserModel.pagingConfig.pageLength = response.pageSize;
              this.pagedUserModel.pagingConfig.PageNumber = response.pageNumber;
              this.pagedUserModel.pagingConfig.totalItems = response.totalItems;
            }

            this.ngxPaginationService.set(this.pagedUserModel);
          });
      }
    }

    if(this.pagedUserModel.addNewElementButtonConfig){
      this.pagedUserModel.addNewElementButtonConfig.onAdd = () => {
        this.dialogService.open(UserFormComponent, {
          context: {
            userModel: {
              firstName: '',
              lastName: '',
              accountBalance: 0,
              ApplicationId: 0,
              email: '',
              organizationId: this.selectedBusinessId,
              organizationName: '',
              password: '',
              roleId: 0,
              roleName: '',
              userId: '',
              userName: ''
            }
          },
        });
      };
    }

    if(this.pagedUserModel.tableConfig){
      this.pagedUserModel.tableConfig.tableMaping = {
        "First Name": "firstName",
        "Last Name": "lastName",
        "User Name": "userName",
        "Role": "roleName"
      };

      this.pagedUserModel.tableConfig.onEdit = (userModel: IUserModel) => {
        this.dialogService.open(UserFormComponent, {
          context: {
            userModel: {
              firstName: userModel.firstName,
              lastName: userModel.lastName,
              accountBalance: 0,
              ApplicationId: 0,
              email: userModel.email,
              organizationId: this.selectedBusinessId,
              organizationName: '',
              password: '',
              roleId: userModel.roleId,
              roleName: '',
              userId: '',
              userName: userModel.userName
            }
          },
        });
      }
      
      this.pagedUserModel.tableConfig.onDelete = () => {}
    }
  }

  loadUsersUnderBusiness(businessId: number): void{
    this.selectedBusinessId = businessId;
    let dataTableCard = Array.from(document.getElementsByTagName('ngx-pagination'))[0];
    if(dataTableCard && dataTableCard.classList.contains('d-none'))
      dataTableCard.classList.remove('d-none');

    this.orgService.getUserByBusinessId(this.pagedUserModel, businessId)
      .subscribe((response) => {
        if(this.pagedUserModel.tableConfig == null) return;
        if(this.pagedUserModel.pagingConfig == null) return;
        if(this.pagedUserModel.searchingConfig == null) return;
        
        if(response.searchString)
          this.pagedUserModel.searchingConfig.searchString = response.searchString;
        else
          this.pagedUserModel.searchingConfig.searchString = '';
        this.pagedUserModel.tableConfig.sourceData = response.sourceData;

        this.pagedUserModel.pagingConfig.onUpdate({
          pageLength: response.pageLength,
          pageNumber: response.pageNumber,
          totalItems: response.totalItems
        });

        this.ngxPaginationService.set(this.pagedUserModel);
      });
  }

  removeOutlet(windowLabel: string, businessId: number): void{ }

  saveUser(windowLabel: string, userModel: IUserModel | null){ }

  removeUser(windowLabel: string, userId: string){ }
}
