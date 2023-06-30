import { Component } from '@angular/core';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { DashboardService } from '../dashboard.service';
import { IBusinessModel } from '../Models/IBusinessModel';
import { IUserModel } from '../Models/IUserModel';

@Component({
  selector: 'app-ums',
  templateUrl: './ums.component.html',
  styleUrls: ['./ums.component.scss']
})
export class UmsComponent {
  pagedProductModel: IPaginationModel<IUserModel>;
  ownedBusinesses: IBusinessModel[];
  constructor(private dashboardService: DashboardService) {
    this.ownedBusinesses = dashboardService.getOutlets();
    this.pagedProductModel = {
      allowAdd: true,
      tableCardHeader: 'User Management System',
      pagingConfig: null,
      searchingConfig: null,
      sourceData: [],
      addNewElementButtonConfig:{
        buttonLabel: 'Add New User',
        onClick: () => {},
        showIcon: true
      },
      tableConfig: {
        isEditableTable: false,
        tableMaping: {
          "User Id": "UserId",
          "First Name": "FirstName",
          "Last Name": "LastName",
          "User Name": "UserName",
        },
        onDelete: () => {
          alert('Event triggered')
        },
        onEdit: () => {
          alert('Event triggered')
        }
      }
    }
    // this.pagedProductModel = dashboardService.getPagingConfig(null, 'New Product');
  }

  loadUsersUnderBusiness(outletId: number): void{
    let dataTableCard = Array.from(document.getElementsByTagName('ngx-pagination'))[0];
    if(dataTableCard && dataTableCard.classList.contains('d-none'))
      dataTableCard.classList.remove('d-none');

    if(outletId == 1) {
      this.pagedProductModel.sourceData = [
        {
          UserId: 'GUID',
          FirstName: 'Nafis',
          LastName: 'Sadik',
          UserName: 'nafis_sadik',
          Password: 'ABC123abc.'
        },
        {
          UserId: 'GUID',
          FirstName: 'Farhan',
          LastName: 'Masud',
          UserName: 'farhan_masud',
          Password: 'ABC123abc.'
        },
        {
          UserId: 'GUID',
          FirstName: 'Fayham',
          LastName: '',
          UserName: 'fayham',
          Password: 'ABC123abc.'
        },
        {
          UserId: 'GUID',
          FirstName: 'Nafis',
          LastName: 'Sadik',
          UserName: 'nafis_sadik',
          Password: 'ABC123abc.'
        },
        {
          UserId: 'GUID',
          FirstName: 'Farhan',
          LastName: 'Masud',
          UserName: 'farhan_masud',
          Password: 'ABC123abc.'
        },
        {
          UserId: 'GUID',
          FirstName: 'Fayham',
          LastName: '',
          UserName: 'fayham',
          Password: 'ABC123abc.'
        },
        {
          UserId: 'GUID',
          FirstName: 'Nafis',
          LastName: 'Sadik',
          UserName: 'nafis_sadik',
          Password: 'ABC123abc.'
        },
        {
          UserId: 'GUID',
          FirstName: 'Farhan',
          LastName: 'Masud',
          UserName: 'farhan_masud',
          Password: 'ABC123abc.'
        },
        {
          UserId: 'GUID',
          FirstName: 'Fayham',
          LastName: '',
          UserName: 'fayham',
          Password: 'ABC123abc.'
        },
      ]
    }
    else{
      this.pagedProductModel.sourceData = [];
    }
  }

  saveOutlet(windowLabel: string, outletModel: IBusinessModel | null): void{ }
  removeOutlet(windowLabel: string, businessId: number): void{ }

  saveUser(windowLabel: string, userModel: IUserModel | null){ }
  removeUser(windowLabel: string, userId: string){ }
}
