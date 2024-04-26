import { Component, Input, OnInit } from '@angular/core';
import { OrganizationModel } from 'src/app/dashboard/Models/organization.model';
import { UserModel } from 'src/app/dashboard/Models/user.model';
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
  pagedUserModel: IPaginationModel<UserModel>;
  @Input() ownedBusinesses: OrganizationModel[];

  // Need the role ids in a seperate array to preselect loaded data on the multiple select dropdown
  private userRoleIds: number[] = [];
  // Need this data only for displaying the role names on the table UI
  private userRoleNames: string = "";

  constructor(
    dashboardService: DashboardService,
    private dialogService: NbDialogService,
    private orgService: OrganizationService,
    // private changeDetector: ChangeDetectorRef,
    private ngxPaginationService: NGXPaginationService<UserModel>
  ) {
    this.pagedUserModel = dashboardService.getPagingConfig(UserFormComponent, 'User Management', 'Add User', 'Search User');

    // Dropdown change event binding
    if(this.pagedUserModel.pagingConfig){
      this.pagedUserModel.pagingConfig.onUpdate = () => {
        this.orgService.getUserByBusinessId(this.pagedUserModel, this.selectedBusinessId)
          .subscribe((response) => {
            this.loadDataOnUI(response);
          });
      }
    }

    if(this.pagedUserModel.addNewElementButtonConfig){
      this.pagedUserModel.addNewElementButtonConfig.onAdd = () => {
        let dialogueRef = this.dialogService.open(UserFormComponent, {
          context: {
            userModel: null,
            selectedBusinessId: this.selectedBusinessId,
            addUser: (userModel: UserModel) => {
              if(this.pagedUserModel.pagingConfig){
                this.pagedUserModel.pagingConfig.totalItems += 1;
                let lastPageNumber: number = Math.ceil(this.pagedUserModel.pagingConfig.totalItems / this.pagedUserModel.pagingConfig.pageLength);
              
                if(lastPageNumber == this.pagedUserModel.pagingConfig.pageNumber){
                  this.pagedUserModel.pagingConfig.totalItems += 1;
                  this.pagedUserModel.tableConfig?.sourceData.push(userModel);
                  this.ngxPaginationService.set(this.pagedUserModel);
                } else {
                  this.pagedUserModel.pagingConfig.pageNumber = lastPageNumber;
                  this.orgService.getUserByBusinessId(this.pagedUserModel, this.selectedBusinessId)
                  .subscribe((response) => {
                    this.loadDataOnUI(response);
                  });
                }

                dialogueRef.close();
              }
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
        "Role": "roleNames"
      };

      this.pagedUserModel.tableConfig.onEdit = (userModel: UserModel) => {
        // Freshly load the api data
        this.userRoleIds = [];
        // userModel.roles.forEach(role => {
        //   this.userRoleIds.push(role.roleId);
        // })

        // Send the data to the pop up to load the data from api on the form
        this.dialogService.open(UserFormComponent, {
          context: {
            userModel: {
              firstName: userModel.firstName,
              lastName: userModel.lastName,
              accountBalance: 0,
              email: userModel.email,
              password: '',
              userRoleIds: [],
              userRoles: [],
              userId: userModel.userId,
              userName: userModel.userName
            },
            selectedBusinessId: this.selectedBusinessId
          },
        });
      }
      
      this.pagedUserModel.tableConfig.onDelete = (data: any) => {
        this.orgService.removeUserFromBusiness(data.userId, this.selectedBusinessId)
        .subscribe(() => {
          location.reload();
        });
      }
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
    
    this.orgService.getUserByBusinessId(this.pagedUserModel, businessId)
      .subscribe((response) => {
        this.loadDataOnUI(response);
      });
  }

  loadDataOnUI(response: any){
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
    // console.log('response', response);
    // Load the ids for multiple select on pop up form
    this.pagedUserModel.tableConfig.sourceData.forEach((user: any) => {
      this.userRoleIds = [];
      this.userRoleNames = '';
      user.roles.forEach((x: any) => {
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
  }
}
