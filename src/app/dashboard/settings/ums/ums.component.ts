import { Component } from '@angular/core';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { DashboardService } from '../../dashboard.service';
import { IBusinessModel } from '../../Models/IBusinessModel';
import { IUserModel } from '../../Models/IUserModel';

@Component({
  selector: 'app-ums',
  templateUrl: './ums.component.html',
  styleUrls: ['./ums.component.scss']
})
export class UmsComponent {
  pagedUserModel: IPaginationModel<IUserModel>;
  ownedBusinesses: IBusinessModel[];
  constructor(
    dashboardService: DashboardService,
    private ngxPaginationService: NGXPaginationService<IUserModel>
  ) {
    this.ownedBusinesses = dashboardService.getOutlets();
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
          UserId: 'GUID',
          FirstName: 'Nafis',
          LastName: 'Sadik',
          UserName: 'nafis_sadik',
          Password: 'ABC123abc.',
          RoleId: 1,
          RoleName: 'Sales Admin'
        },
        {
          UserId: 'GUID',
          FirstName: 'Farhan',
          LastName: 'Masud',
          UserName: 'farhan_masud',
          Password: 'ABC123abc.',
          RoleId: 1,
          RoleName: 'Sales Admin'
        },
        {
          UserId: 'GUID',
          FirstName: 'Fayham',
          LastName: 'Masud',
          UserName: 'fayham',
          Password: 'ABC123abc.',
          RoleId: 1,
          RoleName: 'Sales Admin'
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
