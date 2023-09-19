import { Component } from '@angular/core';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { DashboardService } from '../../services/dashboard.service';
import { IOrganizationModel } from '../../Models/IOrganizationModel';
import { IUserModel } from '../../Models/IUserModel';

@Component({
  selector: 'app-ums',
  templateUrl: './ums.component.html',
  styleUrls: ['./ums.component.scss']
})
export class UmsComponent {
  pagedUserModel: IPaginationModel<IUserModel>;
  ownedBusinesses: IOrganizationModel[];
  constructor(
    dashboardService: DashboardService,
    private ngxPaginationService: NGXPaginationService<IUserModel>
  ) {
    dashboardService.getOutlets()
      .subscribe(response  => {
        this.ownedBusinesses = [];
      });
    this.pagedUserModel = dashboardService.getPagingConfig(null, 'User Management', 'Add User', 'Search User');
    if(this.pagedUserModel.tableConfig){
      this.pagedUserModel.tableConfig.tableMaping = {
        "First Name": "FirstName",
        "Last Name": "LastName",
        "User Name": "UserName",
        "Role": "RoleName"
      };

      this.pagedUserModel.tableConfig.onEdit = () => {}
      this.pagedUserModel.tableConfig.onDelete = () => {}
    }
  }

  loadUsersUnderBusiness(outletId: number): void{
    let dataTableCard = Array.from(document.getElementsByTagName('ngx-pagination'))[0];
    if(dataTableCard && dataTableCard.classList.contains('d-none'))
      dataTableCard.classList.remove('d-none');

    if(this.pagedUserModel.tableConfig == null) return;
    if(outletId == 1) {
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
    this.ngxPaginationService.set(this.pagedUserModel)
  }

  removeOutlet(windowLabel: string, businessId: number): void{ }

  saveUser(windowLabel: string, userModel: IUserModel | null){ }

  removeUser(windowLabel: string, userId: string){ }
}
