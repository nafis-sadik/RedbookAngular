import { Component, OnInit } from '@angular/core';
import { IOrganizationModel } from '../Models/IOrganizationModel';
import { OrganizationService } from '../services/organization.service';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { IUserModel } from '../Models/IUserModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.scss']
})
export class RetailerComponent implements OnInit {
  orgModel: IOrganizationModel;
  userModel: IUserModel;
  linearMode: boolean;

  OrganizationForm: FormGroup;
  AdminUserForm: FormGroup;
  thirdForm: FormGroup;

  constructor(
    private organizationService: OrganizationService,
    private toasterService: NbToastrService,
    private userService: UserService,
    private fb: FormBuilder
  ){
    this.orgModel = {
      organizationId: 0,
      organizationName: '',
      address: []
    };

    this.userModel = {
      AccountBalance: 0,
      Email: '',
      FirstName: '',
      LastName: '',
      OrganizationId: 0,
      OrganizationName: '',
      Password: '',
      RoleId: 0,
      RoleName: '',
      UserId: '',
      UserName: ''
    }

    this.linearMode = true;
  }

  ngOnInit() {
    this.OrganizationForm = this.fb.group({
      OrganizationFormCtrl: ['', Validators.required],
    });

    this.AdminUserForm = this.fb.group({
      AdminUserFormCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  addNewOrganization(stepper: NbStepperComponent): void{
    if(!this.OrganizationForm.valid){
      this.OrganizationForm.markAllAsTouched();
      return;
    }
    
    this.organizationService.addNewOrganization(this.orgModel)
    .subscribe(
      (response) => {
        this.toasterService.success('Operation Successfull', 'Organization added successfully');
        this.orgModel = response;
      },
      (err) => {
        let errRes = err.error.split(',');
        let mainMsg: string = '';
        let subMsg: string = '';
        if(errRes.length > 0){
          mainMsg = errRes[0].charAt(0).toUpperCase() + errRes[0].slice(1);
        }
        if(errRes.length > 1){
          subMsg = errRes[1];
        } else {
          subMsg = 'Error';
        }
        this.toasterService.danger(mainMsg, subMsg);
        console.log(err);
      });
      
      stepper.next();
  }

  addAdminUser(stepper: NbStepperComponent): void{
    if(!this.AdminUserForm.valid){
      this.AdminUserForm.markAllAsTouched();
      return;
    }
    
    if(this.orgModel.organizationId <= 0){
      this.toasterService.danger('You must register an organization first', 'Organization not registered');
      return
    }
    this.userModel.OrganizationId = this.orgModel.organizationId;
    this.userService.registerNewUser(this.userModel).subscribe(response => {
      this.toasterService.success('Operation Successfull', 'User added successfully');
      this.userModel = response;
    });
    stepper.next();
  }
}
