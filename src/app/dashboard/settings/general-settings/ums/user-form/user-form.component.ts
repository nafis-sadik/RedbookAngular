import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { IRoleModel } from 'src/app/dashboard/Models/IRoleModel';
import { IUserModel } from 'src/app/dashboard/Models/IUserModel';
import { OrganizationService } from 'src/app/dashboard/services/organization.service';
import { RoleService } from 'src/app/dashboard/services/role.service';
import { UserService } from 'src/app/dashboard/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  roleList: IRoleModel[];
  @Input() userModel: IUserModel | null;
  @Input() selectedBusinessId: number;

  private isUpdateOperation: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private orgService: OrganizationService,
    private toasterService: NbToastrService,
  ) { }

  ngOnInit(): void {
    console.log('bunjhor', this.userModel);
    // If null was passed, it's a creatge operation, otherwise it's an update operation
    this.isUpdateOperation = !(this.userModel == null);
    if(this.userModel == null){
      this.userModel = {
        firstName: '',
        lastName: '',
        accountBalance: 0,
        ApplicationId: 0,
        email: '',
        organizationId: this.selectedBusinessId,
        organizationName: '',
        password: '',
        roleId: [],
        roleName: '',
        userId: '',
        userName: ''
      }
    }

    this.roleService.getOrganizationRoles(this.userModel.organizationId)
      .subscribe((roles) => {
        this.roleList = roles;
      });

    this.userForm = this.fb.group({
      firstName: [this.userModel.firstName],
      lastName: [this.userModel.lastName],
      userName: [this.userModel.userName, Validators.required],
      email: [this.userModel.email, Validators.required],
      roleId: [this.userModel.roleId, Validators.required]
    });

    this.userForm.valueChanges.subscribe((value) => {
      if(this.userModel){
        this.userModel.firstName = value.firstName;
        this.userModel.lastName = value.lastName;
        this.userModel.userName = value.userName;
        this.userModel.email = value.email;
        this.userModel.roleId = value.roleId;
      }
    });
  }

  saveUser(): any {
    if(this.userModel){
      if(this.isUpdateOperation){
        return this.userService.updateUser(this.userModel)
          .subscribe(() => {
            setTimeout(() => {
              location.reload();
            }, 500);

            this.toasterService.success('Operation Successfull', 'New user added successfully');
          });
      } else {
        return this.orgService.addUserToBusiness(this.userModel)
          .subscribe(() => {
            setTimeout(() => {
              location.reload();
            }, 500);

            this.toasterService.success('Operation Successfull', 'New user added successfully');
          });
      }
    }
  }
}
