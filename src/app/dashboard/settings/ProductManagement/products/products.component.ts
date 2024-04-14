import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { ProductsDetailsFormComponent } from './products-details-form/products-details-form.component';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { ProductService } from '../../../services/products.service';
import { OrganizationModel } from 'src/app/dashboard/Models/organization.model';
import { IProductModel } from 'src/app/dashboard/Models/IProductModel';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { OrganizationService } from 'src/app/dashboard/services/organization.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  selectedOutletId: number;
  isUpdateOperation: boolean = false;

  organizationList: OrganizationModel[];

  pagedProductModel: IPaginationModel<IProductModel>;

  loaderContainer: HTMLElement| null;

  constructor(
    dashboardService: DashboardService,
    private toastrService: NbToastrService,
    private productService: ProductService,
    private orgService: OrganizationService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngxPaginationService: NGXPaginationService<IProductModel>
  ) {
    // On Init shall remove this loading screen forcing to update the DOM.
    // Thus, change detector will work properly on page load
    this.loaderContainer = document.getElementById('LoadingScreen');
    if(this.loaderContainer && this.loaderContainer.classList.contains('d-none')){
      this.loaderContainer.classList.remove('d-none');
      this.loaderContainer.classList.add('d-block');
    }

    this.pagedProductModel = dashboardService.getPagingConfig(ProductsDetailsFormComponent, 'Product List', 'Add New Product');

    if (this.pagedProductModel.tableConfig) {
      this.pagedProductModel.tableConfig.tableMaping = {
        "Product Id": "productId",
        "Product Category": "categoryName",
        "Product Subcategory": "subcategoryName",
        "Product Name": "productName",
        "Price": "purchasePrice",
        "MRP": "retailPrice"
      };

      this.pagedProductModel.tableConfig.onEdit = (product: IProductModel) => {
        dashboardService.ngDialogService.open(ProductsDetailsFormComponent, {
          context: {
            productModelInput: product,
            selectedBusinessId: this.selectedOutletId,
            saveMethod: (product: IProductModel) => {
              this.productService.updateProduct(product)
               .subscribe(response => {
                  this.pagedProductModel.tableConfig?.sourceData.forEach(product => {
                    if(product.productId === response.productId) {
                      Object.assign(product, response);
                      this.toastrService.success('Product Updated Successfully', 'Success');
                      return;
                    }
                  });

                  this.ngxPaginationService.set(this.pagedProductModel);
                  return;
                });
            }
          }
        });
      };

      this.pagedProductModel.tableConfig.onDelete = () => {
        console.log('onDelete');
      };
    }

    if(this.pagedProductModel.addNewElementButtonConfig){
      this.pagedProductModel.addNewElementButtonConfig.onAdd = () => {
        dashboardService.ngDialogService.open(ProductsDetailsFormComponent, {
          context: {
            productModel: undefined,
            selectedBusinessId: this.selectedOutletId,
            saveMethod: (product: IProductModel) => {
              product.organizationId = this.selectedOutletId;
              console.log(product);
              this.productService.addProduct(product)
               .subscribe(response => {
                  this.pagedProductModel.tableConfig?.sourceData.push(response);
                  this.toastrService.success('Product Added Successfully', 'Success');
                  this.changeDetectorRef.detectChanges();
                });
            }
          }
        });
      };
    }
  }

  ngOnInit(): void {
    this.loaderContainer = document.getElementById('LoadingScreen');
    setTimeout(() => {
      if(this.loaderContainer && this.loaderContainer.classList.contains('d-block')){
        this.loaderContainer.classList.remove('d-block');
        this.loaderContainer.classList.add('d-none');

        this.orgService.getUserOrgs()
          .subscribe((orgList: OrganizationModel[]) => {
            this.organizationList = orgList;
            this.changeDetectorRef.detectChanges();
          });
      }
    }, 1.5 * 1000);
  }

  selectOutlet(outletId: number, event: any): void{
    this.selectedOutletId = outletId;

    // Is display is hidden, make it visible
    let dataTableCard = Array.from(document.getElementsByTagName('ngx-pagination'))[0];
    if(dataTableCard && dataTableCard.classList.contains('d-none'))
      dataTableCard.classList.remove('d-none');

    // Add active class to source element and remove from sibling elements
    let sourceElem = event.srcElement;
    Array.from(sourceElem.parentNode.children)
      .forEach((element: any) => {
        if(element != sourceElem)
          element.classList.remove('active');
        else
          element.classList.add('active');
      });

    // Fetch Products for selected outlet
    this.productService.getProductList(outletId, this.pagedProductModel)
      .subscribe((pagedProducts: any) => {
        // Get pagination data to update table
        console.log(pagedProducts)
        if(this.pagedProductModel.tableConfig){
          this.pagedProductModel.tableConfig.sourceData = pagedProducts.sourceData;
        }

        if(this.pagedProductModel.pagingConfig){
          this.pagedProductModel.pagingConfig.pageNumber = pagedProducts.pageNumber;
          this.pagedProductModel.pagingConfig.pageLength = pagedProducts.pageLength;
          this.pagedProductModel.pagingConfig.totalItems = pagedProducts.totalItems;
        }

        if(this.pagedProductModel.searchingConfig){
          this.pagedProductModel.searchingConfig.searchString = pagedProducts.searchString;
        }

        this.ngxPaginationService.set(this.pagedProductModel);
      });
  }
}
