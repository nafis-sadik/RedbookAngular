import { Component } from '@angular/core';
import { IProductModel } from '../Models/IProductModel';
import { NbDialogService, NbMenuBag, NbMenuItem, NbMenuService } from '@nebular/theme';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { ProductsDetailsFormComponent } from './products-details-form/products-details-form.component';
import { IBusinessModel } from '../Models/IBusinessModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  singleSelectGroupValue = [];

  source: IProductModel[] = [
    {
      id: 1,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'EFI',
      productName: '4E-FE',
      purchasePrice: 80000,
      retailPrice: 100000,
      quantity: null
    },
    {
      id: 2,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'Classic',
      productName: '2JZ-GTE',
      purchasePrice: 80000,
      retailPrice: 100000,
      quantity: null
    },
    {
      id: 3,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'VVTi',
      productName: '2ZR-FE',
      purchasePrice: 80000,
      retailPrice: 100000,
      quantity: null
    }
  ];

  source2: IProductModel[] = [
    {
      id: 4,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'VVTi',
      productName: '2ZR-FE',
      purchasePrice: 80000,
      retailPrice: 100000,
      quantity: null
    },
    {
      id: 5,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'VVTi',
      productName: '2ZR-FE',
      purchasePrice: 80000,
      retailPrice: 100000,
      quantity: null
    }
  ];

  outlets: IBusinessModel[] = [
    {
      title: 'Krishi Ghor',
      address: [],
      businessId: 1,
      ownerId: ''
    },
    {
      title: 'FM SkyVision',
      address: [],
      businessId: 2,
      ownerId: ''
    }
  ];

  cardHeader: string = "Product Management";

  pagedProductModel: IPaginationModel<IProductModel>;

  constructor(private dialogService: NbDialogService, private pagingService: NGXPaginationService<IProductModel>) {
    this.pagedProductModel = {
      tableCardHeader: null,
      sourceData: this.source,
      allowAdd: true,
      tableConfig: {
        allowDelete: true,
        allowEdit: true,
        isEditableTable: false,
        tableMaping: {
          "Product Id": "id",
          "Product Category": "categoryName",
          "Product Subcategory": "subcategoryName",
          "Product Name": "productName",
          "Price": "purchasePrice",
          "MRP": "retailPrice"
        },
      },
      pagingConfig:{
        pageNumber: 2,
        totalItems: 268,
        pageLength: 0,
        pageLengthOptions: [ 5, 10, 100 ],
        onChange: () => {
          console.log('Page length change callback');
        }
      },
      searchingConfig:{
        searchString: null,
        inputFieldPlaceholder: 'Search Product',
        buttonLabel: 'Search',
        showIcon: true,
        onClick: () => {
          console.log('Search Callback')
        }
      },
      addNewElementButtonConfig: {
        buttonLabel: 'Add New Product',
        showIcon: true,
        onClick: () => {
          this.dialogService.open(ProductsDetailsFormComponent);
        }
      },
    };
  }

  selectOutlet(businessId: number, event: any): void{
    // Add active class to source element and remove from sibling elements
    let sourceElem = event.srcElement;
    Array.from(sourceElem.parentNode.children).forEach((element: any) => {
      if(element != sourceElem)
        element.classList.remove('active');
      else
        element.classList.add('active');
    });

    if(businessId % 2 == 0)
      this.pagedProductModel.sourceData = this.source;
    else
      this.pagedProductModel.sourceData = this.source2;
    this.pagingService.set(this.pagedProductModel);
  }
}
