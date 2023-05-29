import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ISalesModel } from '../Models/ISalesModel';
import { IProductModel } from '../Models/IProductModel';
import { IBusinessModel } from '../Models/IBusinessModel';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent {
  cardHeader: string = 'Product Sales';

  productListKG: IProductModel[] = [
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

  productListFM: IProductModel[] = [
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

  outletProducts: IProductModel[] = [];

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

  sourceDataKG: ISalesModel[] = [
    {
      id: 1,
      MemoNumber: 'KG-1728',
      NetTotal: 150000,
      PaidAmount: 100000,
      SalesDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 2,
      MemoNumber: 'KG-1729',
      NetTotal: 180000,
      PaidAmount: 100000,
      SalesDate: new Date().toISOString().slice(0, 10),
    }
  ];

  sourceDataFM: ISalesModel[] = [
    {
      id: 1,
      MemoNumber: 'FM-1728',
      NetTotal: 2000,
      PaidAmount: 2000,
      SalesDate: new Date().toISOString().slice(0, 10),
    },
    {
      id: 2,
      MemoNumber: 'FM-1729',
      NetTotal: 1800,
      PaidAmount: 1800,
      SalesDate: new Date().toISOString().slice(0, 10),
    }
  ];

  pagedSalesModel: IPaginationModel<ISalesModel>;

  constructor(private dialogService: NbDialogService, private ngxPaginationService: NGXPaginationService<ISalesModel>) {
    this.pagedSalesModel = {
      tableCardHeader: null,
      sourceData: [],
      allowAdd: true,
      tableConfig: {
        allowDelete: true,
        allowEdit: true,
        isEditableTable: false,
        tableMaping: {
          "Memo No": "MemoNumber",
          "Net Total": "NetTotal",
          "Paid Amount": "PaidAmount",
          "Sales Date": "SalesDate",
        },
      },
      pagingConfig:{
        pageNumber: 0,
        totalItems: 268,
        pageLength: 0,
        pageLengthOptions: [ 5, 10, 100 ],
        onChange: () => {
          console.log('Page length change callback');
        }
      },
      searchingConfig:{
        searchString: null,
        inputFieldPlaceholder: 'Search Invoice',
        buttonLabel: 'Search',
        showIcon: true,
        onClick: () => {
          console.log('Search Callback')
        }
      },
      addNewElementButtonConfig: {
        buttonLabel: 'New Sales',
        showIcon: true,
        onClick: () => {
          this.dialogService.open(AddSalesComponent);
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

    if (businessId == 1)
      this.pagedSalesModel.sourceData = this.sourceDataKG;
    else
      this.pagedSalesModel.sourceData = this.sourceDataFM;

    this.ngxPaginationService.set(this.pagedSalesModel);
  }
}
