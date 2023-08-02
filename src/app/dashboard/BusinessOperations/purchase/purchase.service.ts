import { Injectable } from '@angular/core';
import { IInvoiceModel } from '../../Models/IInvoiceModel';

@Injectable({
    providedIn: 'root',
})

export class PurchaseService {
  getInvoiceList(outletId: number, pageNumber: number, pageLength: number, searchString: string): IInvoiceModel[]{
    let sourceData: IInvoiceModel[];
    if(outletId == 1){
      sourceData =[
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
          InvoiceTerms: '',
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
          ClientName: "Gazi",
          CreatedBy: "User 1",
          InvoiceNo: "TuTu TaTa",
          IssueDate: new Date().toISOString().slice(0, 10),
          PaymentStatus: "Paid",
          PaymentStatusId: 2,
          UpdateDate: new Date(),
          UpdateBy: "Hakina Matata",
          Notes: '',
          InvoiceTerms: '',
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
        }
      ]
    } else if (outletId == 2) {
      sourceData = [
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
          InvoiceTerms: '',
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
          ClientName: "Samsung",
          CreatedBy: "User 1",
          InvoiceNo: "Dudu Dada",
          IssueDate: new Date().toISOString().slice(0, 10),
          PaymentStatus: "Due",
          PaymentStatusId: 1,
          UpdateDate: new Date(),
          UpdateBy: "Hakina Matata",
          Notes: '',
          InvoiceTerms: '',
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
      ]
    } else {
      sourceData = []
    }

    return sourceData;
  }
}
