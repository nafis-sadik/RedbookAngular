import { Component, OnInit } from '@angular/core';
import { IOrganizationModel } from '../Models/IOrganizationModel';
import { OrganizationService } from '../services/organization.service';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { IUserModel } from '../Models/IUserModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AppConfigurationService } from '../services/app-config.service';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.scss']
})
export class RetailerComponent implements OnInit {
  orgModel: IOrganizationModel;
  userModel: IUserModel;
  linearMode: boolean;
  isMobile: boolean;

  OrganizationForm: FormGroup;
  AdminUserForm: FormGroup;

  constructor(
    private appConfigService: AppConfigurationService,
    private organizationService: OrganizationService,
    private toasterService: NbToastrService,
    private userService: UserService,
    private fb: FormBuilder
  ){ this.linearMode = true; }

  ngOnInit() {
    this.isMobile = this.appConfigService.isMobilePhone();

    this.OrganizationForm = this.fb.group({
      organizationName: ['', Validators.required],
    });

    this.AdminUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      accountBalance: ['', Validators.required],
    });

    // Organization model binding
    this.OrganizationForm?.valueChanges.subscribe(value => {
      this.orgModel = value;
    });

    // Admin User model binding
    this.AdminUserForm?.valueChanges.subscribe(value => {
      this.userModel = value;
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
        console.log(err)
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

    this.userModel.organizationId = this.orgModel.organizationId;
    this.userService.registerNewUser(this.userModel).subscribe(response => {
      this.toasterService.success('Operation Successfull', 'User added successfully');
      this.userModel = response;
    });

    stepper.next();
  }

  resetAllForms(stepper: NbStepperComponent): void{    
    this.orgModel = {
      organizationId: 0,
      organizationName: '',
      address: []
    }

    this.userModel = {
      accountBalance: 0,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      organizationId: 0,
      organizationName: '',
      roleId: 0,
      roleName: '',
      userId: '',
      userName: ''
    }
   
    stepper.reset();
  }
}
