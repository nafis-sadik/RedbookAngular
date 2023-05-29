import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { IInvoiceModel } from '../Models/IInvoiceModel';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { IBusinessModel } from '../Models/IBusinessModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { PurchaseService } from './purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})

export class PurchaseComponent {
  cardHeader: string = "Product Purchase";
  
  selectedOutlet: number = 0;

  dummyBackendDataSource: IInvoiceModel[] = [
    {
      InvoiceId: 1,
      ClientId: 1,
      ClientName: "Chittagong Builders",
      CreatedBy: "User 1",
      InvoiceNo: "Dudu Dada",
      IssueDate: new Date().toISOString().slice(0, 10),
      PaymentStatus: "Due",
      PaymentStatusId: 1,
      UpdateDate: new Date(),
      UpdateBy: "Hakina Matata",
      Notes: '',
      Terms: '',
      selectedAddresses: [],
      invoiceProducts: [],
      paymentHistory:[
        {
          DueAmount: 300,
          PaidAmount: 500,
          InvoiceTotal: 800,
          Discount: 15,
          PaymentDate: new Date()
        }
      ],
      InvoiceTotal: 0,
      PaidAmount: 0
    },
    {
      InvoiceId: 2,
      ClientId: 2,
      ClientName: "RFL",
      CreatedBy: "User 1",
      InvoiceNo: "TuTu TaTa",
      IssueDate: new Date().toISOString().slice(0, 10),
      PaymentStatus: "Paid",
      PaymentStatusId: 2,
      UpdateDate: new Date(),
      UpdateBy: "Hakina Matata",
      Notes: '',
      Terms: '',
      selectedAddresses: [],
      invoiceProducts: [],
      paymentHistory:[
        {
          DueAmount: 300,
          PaidAmount: 500,
          InvoiceTotal: 800,
          Discount: 15,
          PaymentDate: new Date()
        }
      ],
      InvoiceTotal: 0,
      PaidAmount: 0
    },
    {
      InvoiceId: 3,
      ClientId: 1,
      ClientName: "Chittagong Builders",
      CreatedBy: "User 1",
      InvoiceNo: "Dudu Dada",
      IssueDate: new Date().toISOString().slice(0, 10),
      PaymentStatus: "Due",
      PaymentStatusId: 1,
      UpdateDate: new Date(),
      UpdateBy: "Hakina Matata",
      Notes: '',
      Terms: '',
      invoiceProducts: [],
      selectedAddresses: [],
      paymentHistory:[
        {
          DueAmount: 300,
          PaidAmount: 500,
          InvoiceTotal: 800,
          Discount: 15,
          PaymentDate: new Date()
        }
      ],
      InvoiceTotal: 0,
      PaidAmount: 0
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

  constructor(
    private dialogService: NbDialogService,
    private purchaseService: PurchaseService,
    private ngxPaginationService: NGXPaginationService<IInvoiceModel>
  )
  {
    // Load and set your backend data here on page load
    this.sourceData = this.dummyBackendDataSource;

    this.pagedProductModel = {
      tableCardHeader: null,
      sourceData: this.sourceData,
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

    this.purchaseService.selectedOutletId = businessId;
    this.ngxPaginationService.set(this.pagedProductModel);
  }
}
