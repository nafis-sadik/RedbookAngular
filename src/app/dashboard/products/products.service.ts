import { Injectable } from "@angular/core";
import { IProductModel } from "../Models/IProductModel";

@Injectable({
    providedIn: 'root',
})

export class ProductService {
  /**
   * Primary key of selected outlet
   * Needs to be passed to dialogue components
   */
  selectedOutletId: number = 0;

  getProductList(outletId: number, pageNumber: number, pageLength: number, searchString: string): IProductModel[]{
    let sourceData: IProductModel[];
    if(outletId == 1){
      sourceData = [
        {
          id: 1,
          categoryId: 1,
          categoryName: 'Motors',
          subcategoryId: 2,
          subcategoryName: 'EFI',
          productName: '4E-FE',
          purchasePrice: 80000,
          retailPrice: 100000,
          quantity: null
        },
        {
          id: 2,
          categoryId: 1,
          categoryName: 'Motors',
          subcategoryId: 2,
          subcategoryName: 'Classic',
          productName: '2JZ-GTE',
          purchasePrice: 80000,
          retailPrice: 100000,
          quantity: null
        },
        {
          id: 3,
          categoryId: 1,
          categoryName: 'Motors',
          subcategoryId: 2,
          subcategoryName: 'VVTi',
          productName: '2ZR-FE',
          purchasePrice: 80000,
          retailPrice: 100000,
          quantity: null
        }
      ];
    } else if (outletId == 2) {
      sourceData = [
        {
          id: 4,
          categoryId: 1,
          categoryName: 'Motors',
          subcategoryId: 2,
          subcategoryName: 'VVTi',
          productName: '2ZR-FE',
          purchasePrice: 80000,
          retailPrice: 100000,
          quantity: null
        },
        {
          id: 5,
          categoryId: 1,
          categoryName: 'Motors',
          subcategoryId: 2,
          subcategoryName: 'VVTi',
          productName: '2ZR-FE',
          purchasePrice: 80000,
          retailPrice: 100000,
          quantity: null
        }
      ];
    } else {
      sourceData = []
    }

    return sourceData;
  }
}
