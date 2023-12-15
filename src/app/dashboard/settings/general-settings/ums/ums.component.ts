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
    console.log(this.pagedUserModel)
    this.orgService.getUserByBusinessId(this.pagedUserModel, businessId)
      .subscribe((response) => {
        if(this.pagedUserModel.tableConfig == null) return;
        this.pagedUserModel.tableConfig.sourceData = response;
        this.ngxPaginationService.set(this.pagedUserModel);
      });
  }

  removeOutlet(windowLabel: string, businessId: number): void{ }

  saveUser(windowLabel: string, userModel: IUserModel | null){ }

  removeUser(windowLabel: string, userId: string){ }
}
