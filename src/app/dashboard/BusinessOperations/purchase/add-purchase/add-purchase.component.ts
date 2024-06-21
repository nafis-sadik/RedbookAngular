import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AddPurchaseService } from '../../../services/add-purchase.service';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { VendorModel } from 'src/app/dashboard/Models/vendor.model';
import { PurchaseInvoiceModel } from 'src/app/dashboard/Models/purchase-invoice.model';
import { PurchaseService } from 'src/app/dashboard/services/purchase.service';
import { PurchaseDetailsModel } from 'src/app/dashboard/Models/purchase-details.model';
import { ProductModel } from 'src/app/dashboard/Models/product.model';
import { ProductService } from 'src/app/dashboard/services/products.service';
import { InvoicePaymentModel } from 'src/app/dashboard/Models/invoice-payment.model';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {
  linearMode = true;

  calculatedTotalAmount: number = 0;

  vendorList: Array<VendorModel> = [];

  outletProductList: Array<ProductModel> = [];

  paymentHistory: Array<InvoicePaymentModel> = [];

  paymentInvoice: InvoicePaymentModel = new InvoicePaymentModel();

  @Input() invoiceModel: PurchaseInvoiceModel = new PurchaseInvoiceModel();

  invoiceForm: FormGroup;

  constructor(
    private productPurchase: ProductService,
    private dashboardService: DashboardService,
    private purchaseService: PurchaseService,
    private addPurchaseService: AddPurchaseService,
    private cdRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    formBuilder: FormBuilder
  ) {
    this.vendorList = dashboardService.getVendors();

    this.invoiceModel = new PurchaseInvoiceModel();

    this.invoiceForm = formBuilder.group({
      vendorId: [0, [Validators.required, Validators.min(1)]],
      purchaseDate: ['', Validators.required],
      totalPurchasePrice: [0, [Validators.required, Validators.min(1)]],
      terms: [''],
      remarks: [''],
    });
  }

  ngOnInit(): void {
    document.getElementById('InvoiceForm')?.addEventListener('keyup', (event) => {
      this.updateTotalAmount();
    });

    this.invoiceForm.valueChanges.subscribe(val => {
      this.invoiceModel.vendorId = val.vendorId;

      if(!Number.isNaN(Number(val.totalPurchasePrice)))
        this.invoiceModel.totalPurchasePrice = Number(val.totalPurchasePrice);

      if (val.purchaseDate) {
        let purchaseDateTime = new Date(val.purchaseDate);
        let displayDate = this.datePipe.transform(purchaseDateTime, 'MMM d, yyyy');
        if(displayDate)
            this.invoiceModel.purchaseDate = displayDate;
      }
    });
  }

  initializeProductDetailsForm(): void{
    if (!this.invoiceForm.valid) {
      let invalidControls: Array<string> = Object.keys(this.invoiceForm.controls)
        .filter((controlName) => this.invoiceForm.controls[controlName].invalid);
      
      invalidControls.forEach(controlName => {
        this.invoiceForm.get(controlName)?.markAsDirty();
      });
      return;
    }
    this.invoiceModel.purchaseDetails = [];
    this.productPurchase.getProductList(this.dashboardService.selectedOutletId)
      .subscribe(response => { this.outletProductList = response; });
  }

  initializePaymentDetailsForm(): void{
    this.invoiceModel.purchaseDetails = [];
    this.addPurchaseService.getPaymentsByInvoiceId(this.invoiceModel.invoiceId)
    .subscribe(response => {
      this.paymentHistory = response;
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

  addCustom() {
    let purchaseDetails = new PurchaseDetailsModel();
    purchaseDetails.productId = 0;
    purchaseDetails.productName = "";
    purchaseDetails.quantity = 1;
    purchaseDetails.unitPrice = 0;
    this.invoiceModel.purchaseDetails.push(purchaseDetails);
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
    this.calculatedTotalAmount = 0;
    this.invoiceModel.purchaseDetails.forEach((detail: PurchaseDetailsModel) => {
      detail.totalPrice = detail.quantity * detail.unitPrice;
      this.calculatedTotalAmount += detail.totalPrice;
    });

    this.cdRef.detectChanges();
  }
}
