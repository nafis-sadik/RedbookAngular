import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { VendorModel } from 'src/app/dashboard/Models/vendor.model';
import { PurchaseInvoiceModel } from 'src/app/dashboard/Models/purchase-invoice.model';
import { PurchaseService } from 'src/app/dashboard/services/purchase.service';
import { ProductModel } from 'src/app/dashboard/Models/product.model';
import { ProductService } from 'src/app/dashboard/services/products.service';
import { InvoicePaymentModel } from 'src/app/dashboard/Models/invoice-payment.model';
import { PurchaseInvoiceDetailsModel } from 'src/app/dashboard/Models/purchase-invoice-details.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { VendorService } from 'src/app/dashboard/services/vendor.service';
import { ProductVariantModel } from 'src/app/dashboard/Models/product-variant.model';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {
  linearMode = false;
  calculatedTotalAmount: number = 0;
  vendorList: Array<VendorModel> = [];
  outletProductList: Array<ProductModel> = [];
  paymentHistory: Array<InvoicePaymentModel> = [];
  paymentInvoice: InvoicePaymentModel = new InvoicePaymentModel();
  @Input() invoiceModel: PurchaseInvoiceModel;

  invoiceForm: FormGroup;
  invoiceItemsForm: FormGroup;

  constructor(
    private vendorService: VendorService,
    private productPurchase: ProductService,
    private dashboardService: DashboardService,
    private purchaseService: PurchaseService,
    private cdRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    formBuilder: FormBuilder
  ) {
    this.vendorService.getList(this.dashboardService.selectedOutletId)
      .subscribe(response => {
        this.vendorList = response;
        this.cdRef.detectChanges();
      });
      
    this.invoiceForm = formBuilder.group({
      chalanNumber: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      vendorId: [0, [Validators.required, Validators.min(1)]],
      invoiceTotal: [0, [Validators.required, Validators.min(1)]],
      terms: [''],
      remarks: [''],
    });
  }

  ngOnInit(): void {
    this.invoiceForm.valueChanges.subscribe(formData => {
      this.invoiceModel.vendorId = formData.vendorId;
      
      if (!Number.isNaN(Number(formData.invoiceTotal)))
        this.invoiceModel.invoiceTotal = Number(formData.invoiceTotal);

      if (formData.purchaseDate) {
        let purchaseDateTime = new Date(formData.purchaseDate);
        let displayDate = this.datePipe.transform(purchaseDateTime, 'MMM d, yyyy');
        if (displayDate)
          this.invoiceModel.chalanDate = displayDate;
      }

      this.invoiceModel.chalanNumber = formData.chalanNumber;
    });

    // Add event listener to calculate total amount
    document.querySelectorAll('#InvoiceForm .step-2')?.forEach(elems => {
      elems.addEventListener('keyup', (event) => {
        this.updateTotalAmount();
      });
    });
  }

  /**
   * Initializes the order details for the purchase invoice.
   * This method is responsible for validating the invoice form and populating the purchase details in the invoice model.
   * If the form is invalid, it marks the invalid controls as dirty to display validation errors.
   * If the form is valid, it fetches the product list for the selected outlet and assigns it to the `outletProductList` property.
   * The `purchaseDetails` property of the `invoiceModel` is then initialized as an empty array.
   */
  initializeOrderDetails(): void {
    if (!this.invoiceForm.valid) {
      let invalidControls: Array<string> = Object.keys(
        this.invoiceForm.controls
      ).filter((controlName) => this.invoiceForm.controls[controlName].invalid);

      invalidControls.forEach((controlName) => {
        this.invoiceForm.get(controlName)?.markAsDirty();
      });
      // return;
    }

    this.invoiceModel.purchaseDetails = [];
    this.productPurchase
      .getProductList(this.dashboardService.selectedOutletId)
      .subscribe(
        (response: Array<ProductModel>) => {
          this.outletProductList = response;
        }, 
        error => { console.log('error', error); }
      );
  }

  /**
   * Saves the invoice by first clearing the `purchaseDetails` array of the `invoiceModel`, then fetching the payment history for the invoice ID and assigning it to the `paymentHistory` property.
   */
  saveInvoice(): void {
    this.purchaseService.emitInvoiceModel(this.invoiceModel);
    return;
  }

  /**
   * Selects products from the `outletProductList` and adds them to the `purchaseDetails` array of the `invoiceModel`.
   *
   * This method takes an array of product IDs (`prodIdArr`) and performs the following steps:
   * 1. Maps the product IDs to numbers.
   * 2. Iterates through the `purchaseDetails` array and removes any products that are already in the list.
   * 3. Iterates through the remaining product IDs and creates new `PurchaseInvoiceDetailsModel` objects for each product, setting the `productId`, `productName`, `quantity`, and `unitPrice` properties.
   * 4. Adds the new `PurchaseInvoiceDetailsModel` objects to the `purchaseDetails` array of the `invoiceModel`.
   * 5. Calls the `updateTotalAmount()` method to update the total amount of the purchase.
   *
   * @param selectedProdIdArr - An array of product IDs to be selected.
   */
  selectProducts(selectedProdIdArr: Array<number>): void {
    // Remove existing products that have been removed by user
    this.invoiceModel.purchaseDetails.forEach(
      (invoiceDetailsModel: PurchaseInvoiceDetailsModel) => {
        if (!selectedProdIdArr.includes(invoiceDetailsModel.productId)) {
          this.invoiceModel.purchaseDetails = this.invoiceModel.purchaseDetails.filter(
            (x) => x.productId != invoiceDetailsModel.productId
          )
        }
      }
    );

    // Get new products
    var existingProdIds = this.invoiceModel.purchaseDetails.filter(x => x.productId > 0).map(x => x.productId);
    selectedProdIdArr.forEach((prodId) => {
      if(!existingProdIds.includes(prodId)){
        let purchaseDetails = new PurchaseInvoiceDetailsModel();
        let product = this.outletProductList.find((x) => x.productId == prodId);
        if (product) {
          purchaseDetails.productId = prodId;
          purchaseDetails.productName = product.productName;
          purchaseDetails.quantity = 1;
          purchaseDetails.purchasePrice = 0;
          let variantList = this.outletProductList.find((x) => x.productId == prodId)?.productVariants;
          if(variantList)
            purchaseDetails.variants = variantList;
        }

        this.invoiceModel.purchaseDetails.push(purchaseDetails);
      }
    });

    this.updateTotalAmount();
  }

  selectVariant(variantId: number): void {

  }

  /**
   * Adds a new `PurchaseInvoiceDetailsModel` object to the `purchaseDetails` array of the `invoiceModel`.
   * 
   * This method creates a new `PurchaseInvoiceDetailsModel` object with the following properties:
   * - `productId`: 0
   * - `productName`: ""
   * - `quantity`: 1
   * - `unitPrice`: 0
   * 
   * The new `PurchaseInvoiceDetailsModel` object is then added to the `purchaseDetails` array of the `invoiceModel`.
   */
  addCustom() {
    let purchaseDetails = new PurchaseInvoiceDetailsModel();
    purchaseDetails.productId = 0;
    purchaseDetails.productName = "";
    purchaseDetails.quantity = 1;
    purchaseDetails.purchasePrice = 0;
    this.invoiceModel.purchaseDetails.push(purchaseDetails);
  }

  /**
   * Updates the unit price of a purchase product detail and recalculates the total amount of the purchase.
   *
   * This method is called when the unit price of a purchase product detail is updated. It iterates through the `purchaseDetails` array of the `invoiceModel` and updates the `unitPrice` property of the matching `PurchaseInvoiceDetailsModel` object. It then calls the `updateTotalAmount()` method to recalculate the total amount of the purchase.
   *
   * @param purchaseProductDetail - The `PurchaseInvoiceDetailsModel` object whose unit price is being updated.
   * @param event - The event object containing the new unit price value.
   */
  updateProductPrice(purchaseProductDetail: PurchaseInvoiceDetailsModel, event: any): void {
    this.invoiceModel.purchaseDetails.forEach((detail: PurchaseInvoiceDetailsModel) => {
      if (detail.productId == purchaseProductDetail.productId && event.target.value) {
        detail.purchasePrice = event.target.value;
      }
    });

    this.updateTotalAmount();
  }

  /**
   * Updates the total amount of the purchase by calculating the total price for each purchase detail and summing them up.
   * This method is called after changes are made to the purchase details, such as adding new products or updating the unit price.
   */
  updateTotalAmount() {
    this.calculatedTotalAmount = 0;
    this.invoiceModel.purchaseDetails.forEach((detail: PurchaseInvoiceDetailsModel) => {
      if(detail.retailPrice == null || detail.retailPrice == undefined
        || detail.purchasePrice == null || detail.purchasePrice == undefined
        || detail.discount == null || detail.discount == undefined
        || detail.quantity == null || detail.quantity == undefined) return;

      // Make sure the numbers are really numbers, it's js at the end of the day, you can never be too sure.
      if (!detail.purchasePrice.toString().includes('.') && !Number.isNaN(Number(detail.purchasePrice)))
        detail.purchasePrice = Number(detail.purchasePrice);
      
      if (!detail.discount.toString().includes('.') && !Number.isNaN(Number(detail.discount)))
        detail.discount = Number(detail.discount);

      if (!detail.retailPrice.toString().includes('.') && !Number.isNaN(Number(detail.retailPrice)))
        detail.retailPrice = Number(detail.retailPrice);

      if(detail.quantity <= 0) detail.quantity = 1;

      let vatRateAmount: number = detail.purchasePrice * (detail.vatRate / 100);
      let grossTotalOnItem: number = detail.quantity * (detail.purchasePrice + vatRateAmount);
      detail.totalPrice = grossTotalOnItem - detail.discount;
      this.calculatedTotalAmount += detail.totalPrice;
    });

    this.calculatedTotalAmount -= this.invoiceModel.totalDiscount;

    this.cdRef.detectChanges();
  }
}
