import { Component } from '@angular/core';
import { IVendorModel } from '../../Models/IVendorModel';
import { IInvoiceModel } from '../../Models/IInvoiceModel';
import { IAddressModel } from '../../Models/IAddressModel';
import { PurchaseService } from '../purchase.service';
import { AddPurchaseService } from './add-purchase.service';
import { IProductModel } from '../../Models/IProductModel';
import { IInvoiceProductModel } from '../../Models/IInvoiceProductModel';
import { IInvoicePaymentModel } from '../../Models/IInvoicePayment';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent {
  linearMode = true;

  vendorList: IVendorModel[];

  outletProductList: IProductModel[] = [];

  invoiceProductIds: number[] = [];

  paymentHistory: IInvoicePaymentModel[] = [];

  addressesOfCurrentOutlet: IAddressModel[];

  invoiceModel: IInvoiceModel;

  constructor(
    dashboardService: DashboardService,
    private purchaseService: PurchaseService,
    private addPurchaseService: AddPurchaseService,
  ) {
    this.vendorList = dashboardService.getVendors();

    this.invoiceModel = {
      InvoiceId: 0,
      ClientId: 0,
      ClientName: '',
      PaymentStatusId: 0,
      InvoiceNo: '',
      Terms: '',
      Notes: '',
      PaymentStatus: '',
      IssueDate: new Date().toISOString().slice(0, 10),
      CreatedBy: '',
      UpdateDate: new Date().toISOString().slice(0, 10),
      UpdateBy: '',
      selectedAddresses: [],
      invoiceProducts: [],
      paymentHistory: this.paymentHistory,
      InvoiceTotal: 0,
      PaidAmount: 0
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
    this.invoiceModel.invoiceProducts = [];
    this.outletProductList = this.addPurchaseService.getProductsByBusinessId(this.purchaseService.selectedOutletId);
  }

  selectProductForPurchase(): void{
    this.invoiceModel.InvoiceTotal = 0;

    // Cache currently selected items
    let selecterProductList: IInvoiceProductModel[] = [];

    // Load previously selected items
    let previousltSelectedItems: { [key: number]: IInvoiceProductModel } = {};
    this.invoiceModel.invoiceProducts.forEach(product => {
      previousltSelectedItems[product.ProductId] = product;
    });

    this.invoiceProductIds.forEach(productId => {
      let productModel: IInvoiceProductModel;
      // Identify the id of newly added product
      if(!previousltSelectedItems[productId]){
        // filter out the newly selected item
        let newlySelectedItems = this.outletProductList.filter(product => product.id == productId)[0];
        productModel = {
          ProductId: newlySelectedItems.id,
          ProductName: newlySelectedItems.productName,
          Quantity: 0,
          PurchasePrice: 0,
          ProductNetTotalPrice: 0
        }
      }
      else{
        // get previous data object
        productModel = previousltSelectedItems[productId];
      }

      // Push previously selected item to finalize the list
      selecterProductList.push(productModel);
      this.invoiceModel.InvoiceTotal += productModel.ProductNetTotalPrice;
    })


    // Cleaning previous selects as all selected products shall be pushed
    this.invoiceModel.invoiceProducts = [];
    // Push items of finalized list to UI
    selecterProductList.forEach(product => this.invoiceModel.invoiceProducts.push(product));
  }

  updateProductNetTotalAmount(productId: number): void{
    this.invoiceModel.invoiceProducts.forEach(product => {
      if(product.ProductId == productId){
        product.ProductNetTotalPrice = product.Quantity * product.PurchasePrice;
      }

      this.invoiceModel.InvoiceTotal += product.ProductNetTotalPrice;
    });
  }
}
