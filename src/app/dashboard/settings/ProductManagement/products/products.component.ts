import { Component } from '@angular/core';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { ProductsDetailsFormComponent } from './products-details-form/products-details-form.component';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { ProductService } from './products.service';
import { IOrganizationModel } from 'src/app/dashboard/Models/IOrganizationModel';
import { IProductModel } from 'src/app/dashboard/Models/IProductModel';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  isUpdateOperation: boolean = false;

  outlets: IOrganizationModel[];

  pagedProductModel: IPaginationModel<IProductModel>;

  loaderContainer: HTMLElement| null;

  constructor(
    dashboardService: DashboardService,
    private productService: ProductService,
    private ngxPaginationService: NGXPaginationService<IProductModel>
  ) {
    dashboardService.getOutlets()
      .subscribe(response => {
        this.outlets = [];
      });

    this.pagedProductModel = dashboardService.getPagingConfig(ProductsDetailsFormComponent, 'New Product');

    if (this.pagedProductModel.tableConfig) {
      this.pagedProductModel.tableConfig.tableMaping = {
        "Product Id": "id",
        "Product Category": "categoryName",
        "Product Subcategory": "subcategoryName",
        "Product Name": "productName",
        "Price": "purchasePrice",
        "MRP": "retailPrice"
      };

      this.pagedProductModel.tableConfig.onEdit = () => {
        this.isUpdateOperation = true;

        dashboardService.ngDialogService.open(ProductsDetailsFormComponent, {
          context: {
            isUpdateOperation: this.isUpdateOperation
          }
        });
      };

      this.pagedProductModel.tableConfig.onDelete = () => {
        console.log('onDelete');
      };
    }
  }
  
  ngOnInit(): void {
    this.loaderContainer = document.getElementById('LoadingScreen');
    
    setTimeout(() => {
      if(this.loaderContainer && this.loaderContainer.classList.contains('d-block')){
        this.loaderContainer.classList.remove('d-block');
        this.loaderContainer.classList.add('d-none');
      }
    }, 1.5 * 1000);
  }

  selectOutlet(outletId: number, event: any): void{
    this.productService.selectedOutletId = outletId;

    // Is display is hidden, make it visible
    let dataTableCard = Array.from(document.getElementsByTagName('ngx-pagination'))[0];
    if(dataTableCard && dataTableCard.classList.contains('d-none'))
      dataTableCard.classList.remove('d-none');

    // Add active class to source element and remove from sibling elements
    let sourceElem = event.srcElement;
    Array.from(sourceElem.parentNode.children).forEach((element: any) => {
      if(element != sourceElem)
        element.classList.remove('active');
      else
        element.classList.add('active');
    });

    let pageLength: number = this.pagedProductModel.pagingConfig? this.pagedProductModel.pagingConfig.pageLength : 5;
    let searchString: string = this.pagedProductModel.searchingConfig? this.pagedProductModel.searchingConfig.searchString : "";
    if(this.pagedProductModel.tableConfig)
      this.pagedProductModel.tableConfig.sourceData = this.productService.getProductList(outletId, 1, pageLength, searchString);
    this.ngxPaginationService.set(this.pagedProductModel);
  }
}
