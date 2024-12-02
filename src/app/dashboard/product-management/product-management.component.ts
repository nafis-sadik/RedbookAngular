import { Component } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { OrganizationModel } from '../Models/organization.model';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent {
  loaderContainer: HTMLElement | null;
  constructor(orgService: OrganizationService) {
    
    this.loaderContainer = document.getElementById('LoadingScreen');
    
    orgService.getUserOrgs()
      .subscribe((orgList: Array<OrganizationModel>) => {
        orgService.emitOrgList(orgList);
        if(this.loaderContainer && this.loaderContainer.classList.contains('d-block')){
          this.loaderContainer.classList.remove('d-block');
          this.loaderContainer.classList.add('d-none');
        }
      },
      (error) => {
        console.log('error', error);
        
        if(this.loaderContainer && this.loaderContainer.classList.contains('d-block')){
          this.loaderContainer.classList.remove('d-block');
          this.loaderContainer.classList.add('d-none');
        }
      });
  }
}