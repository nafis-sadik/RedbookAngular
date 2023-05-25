import { Component } from '@angular/core';
import { IProductModel } from '../Models/IProductModel';
import { NbDialogService, NbMenuItem } from '@nebular/theme';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { ProductsDetailsFormComponent } from './products-details-form/products-details-form.component';

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
      retailPrice: 100000
    },
    {
      id: 2,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'Classic',
      productName: '2JZ-GTE',
      purchasePrice: 80000,
      retailPrice: 100000
    },
    {
      id: 3,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'VVTi',
      productName: '2ZR-FE',
      purchasePrice: 80000,
      retailPrice: 100000
    },
    {
      id: 4,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'VVTi',
      productName: '2ZR-FE',
      purchasePrice: 80000,
      retailPrice: 100000
    },
    {
      id: 5,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'VVTi',
      productName: '2ZR-FE',
      purchasePrice: 80000,
      retailPrice: 100000
    }
  ];

  outlets: NbMenuItem[] = [
    {
      title: 'Krishi Ghor',
    },
    {
      title: 'FM SkyVision',
    }
   ];

  cardHeader: string = "Product Management";

  pagedProductModel: IPaginationModel<IProductModel>;

  constructor(private dialogService: NbDialogService) {
    this.pagedProductModel = {
      tableCardHeader: null,
      sourceData: this.source,
      allowAdd: true,
      allowSearch: true,
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
}
