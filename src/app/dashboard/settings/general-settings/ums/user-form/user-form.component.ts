import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRoleModel } from 'src/app/dashboard/Models/IRoleModel';
import { IUserModel } from 'src/app/dashboard/Models/IUserModel';
import { OrganizationService } from 'src/app/dashboard/services/organization.service';
import { RoleService } from 'src/app/dashboard/services/role.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  roleList: IRoleModel[];
  @Input() userModel: IUserModel;
  @Input() selectedBusinessId: number;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private orgService: OrganizationService
  ) {
    if(this.userModel == undefined || this.userModel == null){
      this.userModel = {
        firstName: '',
        lastName: '',
        accountBalance: 0,
        ApplicationId: 0,
        email: '',
        organizationId: 0,
        organizationName: '',
        password: '',
        roleId: 0,
        roleName: '',
        userId: '',
        userName: ''
      }
    }
  }

  ngOnInit(): void {
    this.roleService.getOrganizationRoles(this.selectedBusinessId)
      .subscribe((roles) => {
        this.roleList = roles;
      });

    this.userForm = this.fb.group({
      firstName: [this.userModel.firstName],
      lastName: [this.userModel.lastName],
      email: [this.userModel.email, Validators.required],
      roleId: [this.userModel.roleId, Validators.required]
    });

    this.userForm.valueChanges.subscribe((value) => {
      this.userModel.firstName = value.firstName;
      this.userModel.lastName = value.lastName;
      this.userModel.email = value.email;
      this.userModel.roleId = value.roleId;
    });
  }

  saveUser(): void {
    this.orgService.addUserToBusiness(this.userModel);
  }
}
