import { Component } from '@angular/core';
import { AppConfigurationService } from '../services/app-config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';
import { OrganizationModel } from '../Models/organization.model';
import { UserModel } from '../Models/user.model';
import { OnboardingModel } from '../Models/onboarding.model';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  onboardignModel: OnboardingModel;
  onboardingFormGroup: FormGroup;

  AdminUserForm: FormGroup;
  OrganizationForm: FormGroup;
  loaderContainer: HTMLElement| null;

  isMobile: boolean;
  linearMode: boolean;
  
  userModel: UserModel;
  orgModel: OrganizationModel;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toasterService: NbToastrService,
    private organizationService: OrganizationService,
    private appConfigService: AppConfigurationService,
  ) { this.loaderContainer = document.getElementById('LoadingScreen'); }

  ngOnInit() {
    this.isMobile = this.appConfigService.isMobilePhone();
    this.linearMode = false;

    this.onboardingFormGroup = this.fb.group({
      organizationName: [this.onboardignModel.organizationName, Validators.required],
      firstName: [this.onboardignModel.firstName, Validators.required],
      lastName: [this.onboardignModel.lastName, Validators.required],
      userName: [this.onboardignModel.userName, Validators.required],
      email: [this.onboardignModel.email, Validators.required],
      accountBalance: [this.onboardignModel.accountBalance, Validators.required],
    });

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
    
    setTimeout(() => {
      if(this.loaderContainer){
        this.loaderContainer.classList.remove('d-block');
        this.loaderContainer.classList.add('d-none');
      }
    }, 1.5 * 1000);
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

    // this.userModel.ApplicationId = 2;
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

    this.userModel = new UserModel();
   
    stepper.reset();
  }
}
