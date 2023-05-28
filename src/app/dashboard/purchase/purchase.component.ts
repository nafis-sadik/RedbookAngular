import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { IInvoiceModel } from '../Models/IInvoiceModel';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { IBusinessModel } from '../Models/IBusinessModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {
  cardHeader: string = "Purchase";

  dummyBackendDataSource: IInvoiceModel[] = [
    {
      InvoiceId: 1,
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
      UpdateBy: "Hakina Matata",
      Discount: 15,
      Notes: '',
      Terms: '',
      address: [
        { 1: 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400' },
        { 2: 'Test Address' }
      ],
      selectedAddresses: []
    },
    {
      InvoiceId: 2,
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
      UpdateBy: "Hakina Matata",
      Discount: 15,
      Notes: '',
      Terms: '',
      address: [
        { 1: 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400' },
        { 2: 'Test Address' }
      ],
      selectedAddresses: []
    },
    {
      InvoiceId: 3,
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
      UpdateBy: "Hakina Matata",
      Discount: 15,
      Notes: '',
      Terms: '',
      address: [
        { 1: 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400' },
        { 2: 'Test Address' }
      ],
      selectedAddresses: []
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

  sourceData: IInvoiceModel[];

  pagedProductModel: IPaginationModel<IInvoiceModel>;

  constructor(private dialogService: NbDialogService, private ngxPaginationService: NGXPaginationService<IInvoiceModel>) {
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
        buttonLabel: 'New Purchase',
        showIcon: true,
        onClick: () => {
          this.dialogService.open(AddPurchaseComponent);
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

    this.ngxPaginationService.set(this.pagedProductModel);
  }
}
