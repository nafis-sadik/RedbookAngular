import { Component, Input, OnInit } from '@angular/core';
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
export class UmsComponent  implements OnInit{
  selectedBusinessId: number;
  pagedUserModel: IPaginationModel<IUserModel>;
  @Input() ownedBusinesses: IOrganizationModel[];

  // Need the role ids in a seperate array to preselect loaded data on the multiple select dropdown
  private userRoleIds: number[] = [];
  // Need this data only for displaying the role names on the table UI
  private userRoleNames: string = "";

  constructor(
    dashboardService: DashboardService,
    private orgService: OrganizationService,
    private dialogService: NbDialogService,
    private ngxPaginationService: NGXPaginationService<IUserModel>
  ) {
    this.pagedUserModel = dashboardService.getPagingConfig(UserFormComponent, 'User Management', 'Add User', 'Search User');

    // Dropdown change event binding
    if(this.pagedUserModel.pagingConfig){
      this.pagedUserModel.pagingConfig.onUpdate = () => {
        this.orgService.getUserByBusinessId(this.pagedUserModel, this.selectedBusinessId)
          .subscribe((response) => {
            if(this.pagedUserModel.tableConfig == null) return;
            if(this.pagedUserModel.pagingConfig == null) return;
            if(this.pagedUserModel.searchingConfig == null) return;
            
            this.pagedUserModel.searchingConfig.searchString = response.searchString;
            this.pagedUserModel.tableConfig.sourceData = response.sourceData;

            if(this.pagedUserModel.pagingConfig){
              this.pagedUserModel.pagingConfig.pageLength = response.pageLength;
              this.pagedUserModel.pagingConfig.pageNumber = response.pageNumber;
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
            userModel: null,
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
        "Role": "roleNames"
      };

      this.pagedUserModel.tableConfig.onEdit = (userModel: IUserModel) => {
        // Freshly load the api data
        this.userRoleIds = [];
        userModel.roles.forEach(role => {
          this.userRoleIds.push(role.roleId);
        })

        // Send the data to the pop up to load the data from api on the form
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
              roles: userModel.roles,
              roleIds: this.userRoleIds,
              roleNames: '',
              userId: userModel.userId,
              userName: userModel.userName
            },
            selectedBusinessId: this.selectedBusinessId
          },
        });
      }
      
      this.pagedUserModel.tableConfig.onDelete = () => {}
    }

    if(this.pagedUserModel.searchingConfig){
      this.pagedUserModel.searchingConfig.onSearch = (searchConfig: any) => {
        if(this.pagedUserModel.pagingConfig && this.pagedUserModel.searchingConfig){
          this.pagedUserModel.pagingConfig.pageLength = searchConfig.pageLength;
          this.pagedUserModel.searchingConfig.searchString = searchConfig.searchString;
          this.pagedUserModel.pagingConfig.pageNumber = searchConfig.pageNumber;

          this.loadUsersUnderBusiness(this.selectedBusinessId);
        } else {
          return;
        }        
      }
    }
  }

  ngOnInit(): void {
    let loaderContainer: HTMLElement| null = document.getElementById('LoadingScreen');

    if(loaderContainer){
      loaderContainer.classList.add('d-block');
      loaderContainer.classList.remove('d-none');
    }
  }

  // Load user data on business selection from radio button click
  loadUsersUnderBusiness(businessId: number): void{
    this.selectedBusinessId = businessId;

    let dataTableCard = Array.from(document.getElementsByTagName('ngx-pagination'))[0];
    if(dataTableCard && dataTableCard.classList.contains('d-none'))
      dataTableCard.classList.remove('d-none');
    
    console.log('this.pagedUserModel', this.pagedUserModel);
    this.orgService.getUserByBusinessId(this.pagedUserModel, businessId)
      .subscribe((response) => {
        if(this.pagedUserModel.tableConfig == null) return;
        if(this.pagedUserModel.pagingConfig == null) return;
        if(this.pagedUserModel.searchingConfig == null) return;
        
        if(response.searchString)
          this.pagedUserModel.searchingConfig.searchString = response.searchString;
        else
          this.pagedUserModel.searchingConfig.searchString = '';
        
        // Preparing pagination data
        this.pagedUserModel.pagingConfig.pageLength = response.pageLength;
        this.pagedUserModel.pagingConfig.pageNumber = response.pageNumber;
        this.pagedUserModel.pagingConfig.totalItems = response.totalItems;

        // Preparing data table
        this.pagedUserModel.tableConfig.sourceData = response.sourceData;
        // Load the ids for multiple select on pop up form
        this.pagedUserModel.tableConfig.sourceData.forEach(user => {
          this.userRoleIds = [];
          this.userRoleNames = '';
          user.roles.forEach(x => {
            this.userRoleIds.push(x.roleId);
            if(!this.userRoleNames.includes(x.roleName)){
              this.userRoleNames += (x.roleName + ", ");
            }
          });

          user.roleIds = this.userRoleIds;
          // slice last 2 characters from the string to remove the garbage from the tail that we needed to add during the loop two lines above
          user.roleNames = this.userRoleNames.slice(0, -2);
        })

        this.ngxPaginationService.set(this.pagedUserModel);
      });
  }

  removeOutlet(windowLabel: string, businessId: number): void{ }

  saveUser(windowLabel: string, userModel: IUserModel | null){ }

  removeUser(windowLabel: string, userId: string){ }
}
