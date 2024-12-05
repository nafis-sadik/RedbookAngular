import { Component, Input } from '@angular/core';
import { AddSalesService } from './add-sales.service';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { ProductService } from 'src/app/dashboard/services/products.service';
import { ProductModel } from 'src/app/dashboard/Models/product.model';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})
export class AddSalesComponent {
  @Input() isUpdateOperation: boolean = false;

  linearMode = true;

  outletProductList: Array<ProductModel> = [];

  // salesModel: ISalesModel;

  memoProductIds: number[] = [];

  // selectedProductsForSale: IInvoiceProductModel[];

  constructor(
      ) {
    // this.selectedProductsForSale = [];

    // this.salesModel = {
    //   id: 0,
    //   MemoNumber: "",
    //   NetTotal: 0,
    //   PaymentAmount: 0,
    //   SalesDate: new Date,
    //   ProductsSold: this.selectedProductsForSale,
    //   CustomerName: '',
    //   DeliveryLocation: '',
    //   CustomerPhoneNumber: '',
    //   Terms: '',
    //   PaymentHistory: []
    // }

    // this.salesModel.PaymentHistory = addSalesService.getPaymentsByMemoId(dashboardService.selectedOutletId);
  }

  initializePaymentDetailsForm() {
    throw new Error('Method not implemented.');
  }

  updateProductNetTotalAmount(): void {
    // this.salesModel.NetTotal = 0;
    // this.salesModel.ProductsSold.forEach(product=>{
    //   product.ProductNetTotalPrice = product.Quantity * product.RetailPrice;
    //   this.salesModel.NetTotal += product.ProductNetTotalPrice;
    // });
  }

  initializeProductDetailsForm(): void {
    // this.salesModel.ProductsSold = [];
    // this.outletProductList = this.productService.getProductList(this.dashboardService.selectedOutletId);
  }

  selectProductToSell(selectedProductIds: number[]): void {
    // This contains the previously selected object that are still selected
    // So, if the product was previously selected and now has been unselected, that is being removed here
    // let previouslySelectedItem: IInvoiceProductModel[] = [];
    // this.selectedProductsForSale.forEach(product => {
    //   selectedProductIds.forEach(productId => {
    //     if(product.ProductId == productId){
    //       previouslySelectedItem.push(product);
    //     }
    //   })
    // });

    // Load previously selected item removing the unselected items
    // this.selectedProductsForSale = previouslySelectedItem;

    // This shall add newly added products based on product selection from ui
    let newlyAddedProductId: number[] = [];
    let itemFound: boolean = false;
    selectedProductIds.forEach(productId => {
      itemFound = false;
      // previouslySelectedItem.forEach(product => {
      //   console.log(productId, product.ProductId, productId == product.ProductId)
      //   if(productId == product.ProductId){
      //     itemFound = true;
      //   }
      // })
      console.log(productId, itemFound)
      if(!itemFound){
        newlyAddedProductId.push(productId);
      }
    });

    if(newlyAddedProductId.length > 0){
      newlyAddedProductId.forEach(() => {
        this.outletProductList.forEach(() => {
          // if(productId == product.productId)
            // this.selectedProductsForSale.push({
            //   ProductId: product.productId,
            //   ProductName: product.productName,
            //   ProductNetTotalPrice: 0,
            //   PurchasePrice: product.purchasePrice,
            //   Quantity: 0,
            //   RetailPrice: product.retailPrice
            // });
        })
      })
    }

    // this.salesModel.ProductsSold = this.selectedProductsForSale;

    this.updateProductNetTotalAmount();
  }
}
