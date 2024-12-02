import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { OrganizationModel } from '../Models/organization.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit{
  loaderContainer: HTMLElement | null;
  constructor(private orgService: OrganizationService) {}

  /**
   * Called when the component is initialized.
   * Hides the loading screen once the user organizations are loaded.
   */
  ngOnInit(): void {
    this.loaderContainer = document.getElementById('LoadingScreen');
    
    this.orgService.getUserOrgs()
      .subscribe((orgList: Array<OrganizationModel>) => {        
        this.orgService.emitOrgList(orgList);
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
