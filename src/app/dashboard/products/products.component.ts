import { Component } from '@angular/core';
import { IProductModel } from '../Models/IProductModel';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { ProductsDetailsFormComponent } from './products-details-form/products-details-form.component';
import { IBusinessModel } from '../Models/IBusinessModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { DashboardService } from '../dashboard.service';
import { ProductService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  isUpdateOperation: boolean = false;

  outlets: IBusinessModel[];

  pagedProductModel: IPaginationModel<IProductModel>;

  constructor(
    dashboardService: DashboardService,
    private productService: ProductService,
    private ngxPaginationService: NGXPaginationService<IProductModel>
  ) {
    this.outlets = dashboardService.getOutlets();

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
    this.pagedProductModel.sourceData = this.productService.getProductList(outletId, 1, pageLength, searchString);
    this.ngxPaginationService.set(this.pagedProductModel);
  }
}
