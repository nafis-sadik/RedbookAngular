import { Injectable } from '@angular/core';
import { IVendorModel } from './Models/IVendorModel';
import { IBusinessModel } from './Models/IBusinessModel';
import { NbDialogService } from '@nebular/theme';
import { IProductModel } from './Models/IProductModel';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
  /**
   * Primary key of selected outlet
   * Needs to be passed to dialogue components
   */
  selectedOutletId: number = 0;

  public readonly ngDialogService: NbDialogService;

  constructor(private dialogService: NbDialogService) {
    this.ngDialogService = dialogService;
  }

  getVendors(): IVendorModel[]{
    return [
      {
        clientId: 1,
        clientName: 'Chittagong Builders',
        contactNumber: null,
        emailAddress: null
      },
      {
        clientId: 2,
        clientName: 'RFL',
        contactNumber: null,
        emailAddress: null
      }
    ];
  }

  getOutlets(): IBusinessModel[]{
    return [
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
  }

  getPagingConfig(dialogueComponent: any, addNewButtonLabel: string) {
    return {
      tableCardHeader: null,
      sourceData: [],
      allowAdd: true,
      tableConfig: {
        onEdit: null,
        onDelete: null,
        isEditableTable: false,
        tableMaping: {
          "Invoice Number": "InvoiceNo",
          "Client Name": "ClientName",
          "Issue Date": "IssueDate",
          "Payment Status": "PaymentStatus",
          "Invoice Total": "InvoiceTotal",
          "Paid Amount": "PaidAmount"
        },
      },
      pagingConfig:{
        pageNumber: 1,
        totalItems: 268,
        pageLength: 5,
        pageLengthOptions: [ 5, 10, 100 ],
        onChange: () => {
          console.log('Page length change callback');
        }
      },
      searchingConfig:{
        searchString: '',
        inputFieldPlaceholder: 'Search Invoice',
        buttonLabel: 'Search',
        showIcon: true,
        onClick: () => {
          console.log('Search Callback')
        }
      },
      addNewElementButtonConfig: {
        buttonLabel: addNewButtonLabel,
        showIcon: true,
        onClick: () => {
          this.dialogService.open(dialogueComponent);
        }
      },
    };
  }

  getProductsByBusinessId(businessId: number): IProductModel[]{
    if (businessId == 1)
        return [
          {
            id: 4,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'VVTi',
            productName: '1NZ-FE: 1.5L Inline-4',
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
              productName: '2NZ-FE: 1.3L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 6,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '2ZZ-GE: 1.8L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 7,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '3S-GE: 2.0L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 8,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '3S-GTE: 2.0L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 9,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '1JZ-GTE: 2.5L Inline-6',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 10,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '2JZ-GTE: 3.0L',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 11,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '4A-GE: 1.6L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          }
        ];
      else
        return [
          {
            id: 1,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '4E-FE 1.5L',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 2,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '1ZZ-FE: 1.8L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 3,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '2RZ-FE: 2.4L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 11,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '2TZ-FE: 2.4L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 12,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '2RZ-FE: 2.4L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 13,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '3RZ-FE: 2.7L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          }
        ];
    }
}
