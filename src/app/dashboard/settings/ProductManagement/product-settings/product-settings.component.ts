import { Component, OnInit } from '@angular/core';
import { ICommonAttribute } from 'src/app/dashboard/Models/ICommonAttribute';
import { IOrganizationModel } from 'src/app/dashboard/Models/IOrganizationModel';
import { CommonAttributeService } from 'src/app/dashboard/services/common-attribute.service';
import { OrganizationService } from 'src/app/dashboard/services/organization.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-product-settings',
  templateUrl: './product-settings.component.html',
  styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit {

  private loaderContainer: HTMLElement | null;
  ownedBusinesses: Array<IOrganizationModel>;
  quantityUnits: Array<ICommonAttribute>;
  brands: Array<ICommonAttribute>;

  constructor(
    private commonAttributeService: CommonAttributeService,
    private orgService: OrganizationService
  ) {
    this.loaderContainer = document.getElementById('LoadingScreen');
    if (this.loaderContainer && this.loaderContainer.classList.contains('d-none')) {
      this.loaderContainer.classList.remove('d-none');
      this.loaderContainer.classList.add('d-block');
    }
  }

  ngOnInit(): void {
    this.loaderContainer = document.getElementById('LoadingScreen');

    setTimeout(() => {
      this.commonAttributeService.getAttributes(environment.attributeTypes.quantity)
        .subscribe((response: Array<ICommonAttribute>) => {
          this.quantityUnits = response;
        });

      this.commonAttributeService.getAttributes(environment.attributeTypes.brands)
        .subscribe((response: Array<ICommonAttribute>) => {
          this.brands = response;
        });

      this.orgService.getAllOrganizations()
        .subscribe((orgList: IOrganizationModel[]) => {
          this.ownedBusinesses = orgList;
        });

      if (this.loaderContainer && this.loaderContainer.classList.contains('d-block')) {
        this.loaderContainer.classList.remove('d-block');
        this.loaderContainer.classList.add('d-none');
      }
    }, 1.5 * 1000);
  }

}

