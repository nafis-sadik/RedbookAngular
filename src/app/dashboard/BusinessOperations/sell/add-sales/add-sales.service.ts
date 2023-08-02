import { Injectable } from '@angular/core';
import { IPaymentModel } from 'src/app/dashboard/Models/IPaymentModel';

@Injectable({
    providedIn: 'root',
})
export class AddSalesService {
  getPaymentsByMemoId(memoId: number): IPaymentModel[]{
    return [
        {
            id: 1,
            InvoiceId: 1,
            InvoiceTotalAmount: 500,
            PaymentAmount: 0,
            PaymentDate: new Date().toISOString().slice(0, 10),
            TotalDueAmount: 0
        },
        {
            id: 3,
            InvoiceId: 1,
            InvoiceTotalAmount: 300,
            PaymentAmount: 0,
            PaymentDate: new Date().toISOString().slice(0, 10),
            TotalDueAmount: 0
        },
        {
            id: 5,
            InvoiceId: memoId,
            InvoiceTotalAmount: 700,
            PaymentAmount: 0,
            PaymentDate: new Date().toISOString().slice(0, 10),
            TotalDueAmount: 0
        }
    ];
  }
}
