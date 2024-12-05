import { Component, Input, OnInit } from '@angular/core';
import { PurchaseInvoiceDetailsModel } from 'src/app/dashboard/Models/purchase-invoice-details.model';
import { PurchaseInvoiceModel } from 'src/app/dashboard/Models/purchase-invoice.model';
import { PurchaseDetailsService } from 'src/app/dashboard/services/purchase-details.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {
  @Input() invoiceModel: PurchaseInvoiceModel;
  netTotal: number = 0;

  constructor(private invoiceDetailsService: PurchaseDetailsService) { }

  ngOnInit(): void {
    this.invoiceDetailsService
      .getPurchaseDetailsList(this.invoiceModel.invoiceId)
      .subscribe(invoiceDetails => {
        this.invoiceModel.purchaseDetails = invoiceDetails;
        for(let index = 0; index < invoiceDetails.length; index++){
          let unitVatRate = invoiceDetails[index].vatRate / 100;
          let unitVatValue = invoiceDetails[index].purchasePrice * unitVatRate;
          let unitCost = invoiceDetails[index].purchasePrice + unitVatValue;
          invoiceDetails[index].totalPrice = unitCost * invoiceDetails[index].quantity;
          invoiceDetails[index].totalPrice -= invoiceDetails[index].discount;
          this.netTotal += invoiceDetails[index].totalPrice;
        }
      })
  }
}
