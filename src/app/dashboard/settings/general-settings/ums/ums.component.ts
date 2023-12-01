import { Component, Input } from '@angular/core';
import { IOrganizationModel } from 'src/app/dashboard/Models/IOrganizationModel';
import { IUserModel } from 'src/app/dashboard/Models/IUserModel';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { UserFormComponent } from './user-form/user-form.component';
import { NbDialogService } from '@nebular/theme';

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
    private dialogService: NbDialogService,
    private ngxPaginationService: NGXPaginationService<IUserModel>
  ) {
    this.pagedUserModel = dashboardService.getPagingConfig(UserFormComponent, 'User Management', 'Add User', 'Search User');

    if(this.pagedUserModel.addNewElementButtonConfig){
      this.pagedUserModel.addNewElementButtonConfig.onAdd = () => {
        this.dialogService.open(UserFormComponent, {
          context: {
            selectedBusinessId: this.selectedBusinessId
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

      this.pagedUserModel.tableConfig.onEdit = () => {
        console.log('selectedBusinessId ss', this.selectedBusinessId);
        this.dialogService.open(UserFormComponent, {
          context: {
            selectedBusinessId: this.selectedBusinessId
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

    if(this.pagedUserModel.tableConfig == null) return;
    if(businessId == 1) {
      this.pagedUserModel.tableConfig.sourceData = [
        {
          userId: 'GUID',
          firstName: 'Nafis',
          lastName: 'Sadik',
          userName: 'nafis_sadik',
          password: 'ABC123abc.',
          roleId: 1,
          roleName: 'Sales Admin',
          accountBalance: 999999,
          email: 'hemail@shemail.com',
          organizationId: 0,
          organizationName: 'Honululiu',
          ApplicationId: 1
        },
        {
          userId: 'GUID',
          firstName: 'Farhan',
          lastName: 'Masud',
          userName: 'farhan_masud',
          password: 'ABC123abc.',
          roleId: 1,
          roleName: 'Sales Admin',
          accountBalance: 999999,
          email: 'hemail@shemail.com',
          organizationId: 0,
          organizationName: 'Honululiu',
          ApplicationId: 1
        },
        {
          userId: 'GUID',
          firstName: 'Fayham',
          lastName: 'Masud',
          userName: 'fayham',
          password: 'ABC123abc.',
          roleId: 1,
          roleName: 'Sales Admin',
          accountBalance: 999999,
          email: 'hemail@shemail.com',
          organizationId: 0,
          organizationName: 'Honululiu',
          ApplicationId: 1
        }
      ]
    }
    else{
      this.pagedUserModel.tableConfig.sourceData = [];
    }
    this.ngxPaginationService.set(this.pagedUserModel);
  }

  removeOutlet(windowLabel: string, businessId: number): void{ }

  saveUser(windowLabel: string, userModel: IUserModel | null){ }

  removeUser(windowLabel: string, userId: string){ }
}
