import { Component, OnInit } from '@angular/core';
import { OrganizationModel } from '../../Models/organization.model';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {
  loaderContainer: HTMLElement | null;
  organizationList: OrganizationModel[];

  constructor(private orgService: OrganizationService) { }

  ngOnInit(): void {
    this.loaderContainer = document.getElementById('LoadingScreen');

    setTimeout(() => {
      if(this.loaderContainer && this.loaderContainer.classList.contains('d-block')){
        this.loaderContainer.classList.remove('d-block');
        this.loaderContainer.classList.add('d-none');
      }
    }, 1.5 * 1000);

    this.orgService.getUserOrgs().subscribe((orgList: OrganizationModel[]) => {
      this.organizationList = orgList;
    })
  }
}
