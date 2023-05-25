import { Component } from '@angular/core';
import { NbDialogService, NbMenuItem } from '@nebular/theme';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { IInvoiceModel } from '../Models/IInvoiceModel';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {
  cardHeader: string = "Purchase";

  outlets: NbMenuItem[] = [
    {
      title: 'Krishi Ghor',
    },
    {
      title: 'FM SkyVision',
    }
  ];

   sourceData: IInvoiceModel[];
   dummyBackendDataSource: IInvoiceModel[] = [
    {
      ClientId: 1,
      ClientName: "Chittagong Builders",
      CreatedBy: "User 1",
      DueAmount: 300,
      InvoiceNo: "Dudu Dada",
      PaidAmount: 500,
      InvoiceTotal: 800,
      IssueDate: new Date().toISOString().slice(0, 10),
      PaymentStatus: "Due",
      PaymentStatusId: 1,
      UpdateDate: new Date(),
      UserId: "Hakina Matata",
      Discount: 15,
      Notes: '',
      Terms: '',
      address: [ 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400' ]
    },
    {
      ClientId: 2,
      ClientName: "RFL",
      CreatedBy: "User 1",
      DueAmount: 300,
      InvoiceNo: "TuTu TaTa",
      PaidAmount: 500,
      InvoiceTotal: 800,
      IssueDate: new Date().toISOString().slice(0, 10),
      PaymentStatus: "Paid",
      PaymentStatusId: 2,
      UpdateDate: new Date(),
      UserId: "Hakina Matata",
      Discount: 15,
      Notes: '',
      Terms: '',
      address: [ 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400' ]
    },
    {
      ClientId: 1,
      ClientName: "Chittagong Builders",
      CreatedBy: "User 1",
      DueAmount: 300,
      InvoiceNo: "Dudu Dada",
      PaidAmount: 500,
      InvoiceTotal: 800,
      IssueDate: new Date().toISOString().slice(0, 10),
      PaymentStatus: "Due",
      PaymentStatusId: 1,
      UpdateDate: new Date(),
      UserId: "Hakina Matata",
      Discount: 15,
      Notes: '',
      Terms: '',
      address: [ 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400' ]
    }
   ];

   pagedProductModel: IPaginationModel<IInvoiceModel>;

   constructor(private dialogService: NbDialogService) {
    // Load and set your backend data here on page load
    this.sourceData = this.dummyBackendDataSource;

    this.pagedProductModel = {
      tableCardHeader: null,
      sourceData: this.sourceData,
      allowAdd: true,
      allowSearch: true,
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
        searchString: null,
        inputFieldPlaceholder: 'Search Invoice',
        buttonLabel: 'Search',
        showIcon: true,
        onClick: () => {
          console.log('Search Callback')
        }
      },
      addNewElementButtonConfig: {
        buttonLabel: 'New Purchase Invoice',
        showIcon: true,
        onClick: () => {
          this.dialogService.open(AddPurchaseComponent);
        }
      },
     };
   }
}
