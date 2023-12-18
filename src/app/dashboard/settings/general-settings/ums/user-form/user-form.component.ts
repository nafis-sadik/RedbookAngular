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

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private orgService: OrganizationService
  ) { }

  ngOnInit(): void {
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
      this.userModel.firstName = value.firstName;
      this.userModel.lastName = value.lastName;
      this.userModel.userName = value.userName;
      this.userModel.email = value.email;
      this.userModel.roleId = value.roleId;
    });
  }

  saveUser(): any {
    return this.orgService.addUserToBusiness(this.userModel)
      .subscribe((response) => {
        console.log(response);
      })
  }
}
