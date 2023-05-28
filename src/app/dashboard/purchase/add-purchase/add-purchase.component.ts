import { Component } from '@angular/core';
import { IClientList } from '../../Models/IClientList';
import { IInvoiceModel } from '../../Models/IInvoiceModel';
import { IAddressModel } from '../../Models/IAddressModel';
import { PurchaseService } from '../purchase.service';
import { AddPurchaseService } from './add-purchase.service';
import { IProductModel } from '../../Models/IProductModel';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent {
  linearMode = true;

  clientList: IClientList[];

  productList: IProductModel[] = [];

  pagedProductModel: IPaginationModel<IProductModel>;

  invoiceModel: IInvoiceModel;

  addressesOfCurrentOutlet: IAddressModel[];

  constructor(private purchaseService: PurchaseService, private addPurchaseService: AddPurchaseService) {
    this.pagedProductModel = {
      allowAdd: false,
      pagingConfig: null,
      addNewElementButtonConfig: null,
      searchingConfig: null,
      sourceData: this.productList,
      tableCardHeader: 'Products',
      tableConfig: null,
    }

    this.clientList = [
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

    this.invoiceModel = {
      InvoiceId: 0,
      ClientId: 0,
      ClientName: '',
      IssueDate: new Date().toISOString().slice(0, 10),
      PaymentStatusId: 0,
      InvoiceNo: '',
      InvoiceTotal: 0,
      PaidAmount: 0,
      CreatedBy: '',
      Discount: 0,
      DueAmount: 0,
      Notes: '',
      PaymentStatus: '',
      Terms: '',
      UpdateDate: new Date().toISOString().slice(0, 10),
      UpdateBy: '',
      address: [],
      selectedAddresses: [],
      selectedProducts: []
    }

    this.addressesOfCurrentOutlet = this.addPurchaseService.getAddressesOfOutlet(this.purchaseService.selectedOutletId);
  }

  addSelectedAddress(addressId: number): void{
    if (this.invoiceModel.selectedAddresses == null || this.invoiceModel.selectedAddresses == undefined)
      this.invoiceModel.selectedAddresses = [];
    
    if (!this.invoiceModel.selectedAddresses.includes(addressId))
      this.invoiceModel.selectedAddresses.push(addressId)
    else
      this.invoiceModel.selectedAddresses = this.invoiceModel.selectedAddresses.filter(x => x != addressId);
  }

  initializeProductDetailsForm(): void{
      this.productList = this.addPurchaseService.getProductsByBusinessId(this.purchaseService.selectedOutletId);
  }

  
}
