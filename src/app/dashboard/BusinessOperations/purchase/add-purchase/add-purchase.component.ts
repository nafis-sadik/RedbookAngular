import { Component, Input } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { AddPurchaseService } from './add-purchase.service';
import { IProductModel } from 'src/app/dashboard/Models/IProductModel';
import { IInvoicePaymentModel } from 'src/app/dashboard/Models/IInvoicePayment';
import { IAddressModel } from 'src/app/dashboard/Models/IAddressModel';
import { IPaymentModel } from 'src/app/dashboard/Models/IPaymentModel';
import { IInvoiceModel } from 'src/app/dashboard/Models/IInvoiceModel';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { VendorModel } from 'src/app/dashboard/Models/vendor.model';
import { PurchaseInvoiceModes } from 'src/app/dashboard/Models/purchase-invoice.model';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent {
  @Input() isUpdateOperation: boolean = false;

  linearMode = true;

  vendorList: VendorModel[];

  outletProductList: IProductModel[] = [];

  invoiceProductIds: number[] = [];

  paymentHistory: IInvoicePaymentModel[] = [];

  addressesOfCurrentOutlet: IAddressModel[];

  paymentInvoice: IPaymentModel;

  invoiceModel: IInvoiceModel;

  paymentRecords: IPaymentModel[] = [];

  constructor(
    private dashboardService: DashboardService,
    private purchaseService: PurchaseService,
    private addPurchaseService: AddPurchaseService,
  ) {
    this.vendorList = dashboardService.getVendors();

    this.paymentInvoice = {
      id: 0,
      InvoiceId: 0,
      InvoiceTotalAmount: 0,
      PaymentAmount: 0,
      PaymentDate: new Date().toISOString().slice(0, 10),
      TotalDueAmount: 0
    }

    this.invoiceModel = {
      InvoiceId: 0,
      ClientId: 0,
      ClientName: '',
      PaymentStatusId: 0,
      InvoiceNo: '',
      InvoiceTerms: '',
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

    this.addressesOfCurrentOutlet = this.addPurchaseService.getAddressesOfOutlet(this.dashboardService.selectedOutletId);
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
    this.outletProductList = this.addPurchaseService.getProductsByBusinessId(this.dashboardService.selectedOutletId);
  }

  initializePaymentDetailsForm(): void{
    this.invoiceModel.invoiceProducts = [];
    this.paymentRecords = this.addPurchaseService.getPaymentsByInvoiceId(this.invoiceModel.InvoiceId);

    this.paymentRecords.forEach(paymentRecord => {
      if(this.invoiceModel){
        paymentRecord.InvoiceTotalAmount = this.invoiceModel.InvoiceTotal;
      }
    })
  }

  selectProductForPurchase(): void{
    this.invoiceModel.InvoiceTotal = 0;

    // Cache currently selected items
    let selecterProductList: PurchaseInvoiceModes[] = [];

    // Load previously selected items
    let previousltSelectedItems: { [key: number]: PurchaseInvoiceModes } = {};
    this.invoiceModel.invoiceProducts.forEach(product => {
      previousltSelectedItems[product.ProductId] = product;
    });

    this.invoiceProductIds.forEach(productId => {
      let productModel: PurchaseInvoiceModes;
      // Identify the id of newly added product
      if(!previousltSelectedItems[productId]){
        // filter out the newly selected item
        let newlySelectedItems = this.outletProductList.filter(product => product.productId == productId)[0];
        productModel = {
          ProductId: newlySelectedItems.productId,
          ProductName: newlySelectedItems.productName,
          Quantity: 0,
          PurchasePrice: 0,
          RetailPrice: 0,
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
