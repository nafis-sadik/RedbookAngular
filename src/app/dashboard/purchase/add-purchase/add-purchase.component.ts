import { Component } from '@angular/core';
import { IClientList } from '../../Models/IClientList';
import { IInvoiceModel } from '../../Models/IInvoiceModel';
import { NbDateService } from '@nebular/theme';
import { IAddressModel } from '../../Models/IAddressModel';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent {
  linearMode = true;

  clientList: IClientList[];

  invoiceModel: IInvoiceModel;

  dummyBackendaddressesOfCurrentOutlet: IAddressModel[] = [
    {
      AddressId: 1,
      FullAddress: 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400'
    },
    {
      AddressId: 2,
      FullAddress: 'Test Address'
    }
  ]

  addressesOfCurrentOutlet: IAddressModel[];

  constructor(protected dateService: NbDateService<Date>) {
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
      selectedAddresses: []
    }

    this.addressesOfCurrentOutlet = this.dummyBackendaddressesOfCurrentOutlet;
  }

  addSelectedAddress(addressId: number): void{
    if (this.invoiceModel.selectedAddresses == null || this.invoiceModel.selectedAddresses == undefined)
      this.invoiceModel.selectedAddresses = [];
    
    if (!this.invoiceModel.selectedAddresses.includes(addressId))
      this.invoiceModel.selectedAddresses.push(addressId)
    else
      this.invoiceModel.selectedAddresses = this.invoiceModel.selectedAddresses.filter(x => x != addressId);
  }

  save(): void{
    console.log(this.invoiceModel);
  }
}
