import { Component, Input } from '@angular/core';
import { AddPurchaseService } from '../../../services/add-purchase.service';
import { IInvoicePaymentModel } from 'src/app/dashboard/Models/IInvoicePayment';
import { IAddressModel } from 'src/app/dashboard/Models/IAddressModel';
import { IPaymentModel } from 'src/app/dashboard/Models/IPaymentModel';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { VendorModel } from 'src/app/dashboard/Models/vendor.model';
import { PurchaseInvoiceModel } from 'src/app/dashboard/Models/purchase-invoice.model';
import { PurchaseService } from 'src/app/dashboard/services/purchase.service';
import { PurchaseDetailsModel } from 'src/app/dashboard/Models/purchase-details.model';
import { ProductModel } from 'src/app/dashboard/Models/product.model';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent {
  linearMode = true;

  vendorList: Array<VendorModel> = [];

  outletProductList: Array<ProductModel> = [];

  paymentHistory: Array<IInvoicePaymentModel> = [];

  addressesOfCurrentOutlet: Array<IAddressModel> = [];

  paymentInvoice: IPaymentModel;

  @Input() invoiceModel: PurchaseInvoiceModel = new PurchaseInvoiceModel();

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

    this.invoiceModel = new PurchaseInvoiceModel();
    this.addPurchaseService.getAddressesOfOutlet(this.dashboardService.selectedOutletId)
      .subscribe(response => {
        this.addressesOfCurrentOutlet = response;
      });
  }

  addSelectedAddress(addressId: number): void{
    if (this.invoiceModel.remarks)
      this.invoiceModel.purchaseDetails = [];

    // if (!this.invoiceModel.selectedAddresses.includes(addressId))
    //   this.invoiceModel.selectedAddresses.push(addressId)
    // else
    //   this.invoiceModel.selectedAddresses = this.invoiceModel.selectedAddresses.filter(x => x != addressId);
  }

  initializeProductDetailsForm(): void{
    this.invoiceModel.purchaseDetails = [];
    this.addPurchaseService.getProductsByBusinessId(this.dashboardService.selectedOutletId)
    .subscribe(response => {
       this.outletProductList = response;
     });
  }

  initializePaymentDetailsForm(): void{
    this.invoiceModel.purchaseDetails = [];
    this.addPurchaseService.getPaymentsByInvoiceId(this.invoiceModel.invoiceId)
    .subscribe(response => {
      this.paymentRecords = response;
      this.paymentRecords.forEach(paymentRecord => {
        if(this.invoiceModel){
          paymentRecord.InvoiceTotalAmount = this.invoiceModel.totalPurchasePrice;
        }
      })
    });
  }

  selectProductForPurchase(): void{
    this.invoiceModel.totalPurchasePrice = 0;

    // Cache currently selected items
    let selecterProductList: PurchaseInvoiceModel[] = [];

    // Load previously selected items
    let previousltSelectedItems: { [key: number]: PurchaseInvoiceModel } = {};
    // this.invoiceModel.purchaseDetails.forEach(invoiceDetails => {
    //   previousltSelectedItems[invoiceDetails.productId] = invoiceDetails;
    // });
/*
    this.invoiceProductIds.forEach(productId => {
      let productModel: PurchaseInvoiceModel;
      // Identify the id of newly added product
      if(!previousltSelectedItems[productId]){
        // filter out the newly selected item
        let newlySelectedItems = this.outletProductList.filter(product => product.productId == productId)[0];
        productModel = new PurchaseInvoiceModel();
      }
      else{
        // get previous data object
        productModel = previousltSelectedItems[productId];
      }

      // Push previously selected item to finalize the list
      selecterProductList.push(productModel);
      this.invoiceModel.totalPurchasePrice += productModel.totalPurchasePrice;
    })
*/

    // Cleaning previous selects as all selected products shall be pushed
    this.invoiceModel.purchaseDetails = [];
    // Push items of finalized list to UI
    // selecterProductList.forEach(product => this.invoiceModel.purchaseDetails.push(product));
  }

  updateProductNetTotalAmount(productId: number): void{
    this.invoiceModel.totalPurchasePrice = 0;
    this.invoiceModel.purchaseDetails.forEach((invoice: PurchaseDetailsModel) => {
      if(invoice.productId == productId){
        this.invoiceModel.totalPurchasePrice = invoice.quantity * invoice.unitPrice;
      }
    });
  }
}
