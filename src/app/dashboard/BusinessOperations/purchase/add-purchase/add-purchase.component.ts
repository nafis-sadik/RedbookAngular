import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
import { ProductService } from 'src/app/dashboard/services/products.service';

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
    private productPurchase: ProductService,
    private dashboardService: DashboardService,
    private purchaseService: PurchaseService,
    private addPurchaseService: AddPurchaseService,
    private cdRef: ChangeDetectorRef
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
    this.productPurchase.getProductList(this.dashboardService.selectedOutletId)
      .subscribe(response => { this.outletProductList = response; });
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

  selectProductForPurchase(prodIdArr: Array<number>): void{
    prodIdArr = prodIdArr.map((value) => Number(value));
    this.invoiceModel.purchaseDetails.forEach((purchaseDetailsModel: PurchaseDetailsModel) => {
      if (prodIdArr.includes(purchaseDetailsModel.productId)) {
        let prodIdIndex = prodIdArr.indexOf(purchaseDetailsModel.productId);
        prodIdArr.splice(prodIdIndex, 1);
      }
    });
    prodIdArr.forEach((prodId) => {
      let purchaseDetails = new PurchaseDetailsModel();
      let product = this.outletProductList.find(x => x.productId == prodId);
      if(product){
        purchaseDetails.productId = prodId;
        purchaseDetails.productName = product.productName;
        purchaseDetails.quantity = 1;
        purchaseDetails.unitPrice = 0;
      }
      this.invoiceModel.purchaseDetails.push(purchaseDetails);
    });

    this.updateTotalAmount();
  }

  updateProductQuantity(purchaseProductDetail: PurchaseDetailsModel, event: any): void {
    this.invoiceModel.purchaseDetails.forEach((detail: PurchaseDetailsModel) => {
      if (detail.productId == purchaseProductDetail.productId && event.target.value) {
        detail.quantity = event.target.value;
      }
    });

    this.updateTotalAmount();
  }

  updateProductPrice(purchaseProductDetail: PurchaseDetailsModel, event: any): void {
    this.invoiceModel.purchaseDetails.forEach((detail: PurchaseDetailsModel) => {
      if (detail.productId == purchaseProductDetail.productId && event.target.value) {
        detail.unitPrice = event.target.value;
      }
    });

    this.updateTotalAmount();
  }

  updateTotalAmount() {
    this.invoiceModel.totalPurchasePrice = 0;
    this.invoiceModel.purchaseDetails.forEach((detail: PurchaseDetailsModel) => {
      detail.totalPrice = detail.quantity * detail.unitPrice;
      this.invoiceModel.totalPurchasePrice += detail.totalPrice;
    });

    this.cdRef.detectChanges();
  }
}
