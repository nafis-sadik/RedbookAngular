import { Injectable } from '@angular/core';
import { IVendorModel } from './Models/IVendorModel';
import { IBusinessModel } from './Models/IBusinessModel';
import { NbDialogService } from '@nebular/theme';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
  constructor(private dialogService: NbDialogService) { }

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

  getPagingConfig(dialogueComponent: any) {
    return {
      tableCardHeader: null,
      sourceData: [],
      allowAdd: true,
      tableConfig: {
        allowDelete: true,
        allowEdit: true,
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
        pageNumber: 0,
        totalItems: 268,
        pageLength: 0,
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
        buttonLabel: 'New Purchase',
        showIcon: true,
        onClick: () => {
          this.dialogService.open(dialogueComponent);
        }
      },
    };
  }
}
