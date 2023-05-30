import { Injectable } from "@angular/core";
import { ISalesModel } from "../Models/ISalesModel";

@Injectable({
    providedIn: 'root',
})

export class SalesService {
  /**
   * Primary key of selected outlet
   * Needs to be passed to dialogue components
   */
  selectedOutletId: number = 0;

  getSalesList(outletId: number, pageNumber: number, pageLength: number, searchString: string): ISalesModel[] {
    let sourceData: ISalesModel[];
    if(outletId == 1){
      sourceData = [
        {
          id: 1,
          MemoNumber: 'KG-1728',
          NetTotal: 150000,
          PaidAmount: 100000,
          SalesDate: new Date().toISOString().slice(0, 10),
        },
        {
          id: 2,
          MemoNumber: 'KG-1729',
          NetTotal: 180000,
          PaidAmount: 100000,
          SalesDate: new Date().toISOString().slice(0, 10),
        }
      ];
    } else if (outletId == 2) {
      sourceData = [
        {
          id: 1,
          MemoNumber: 'FM-1728',
          NetTotal: 2000,
          PaidAmount: 2000,
          SalesDate: new Date().toISOString().slice(0, 10),
        },
        {
          id: 2,
          MemoNumber: 'FM-1729',
          NetTotal: 1800,
          PaidAmount: 1800,
          SalesDate: new Date().toISOString().slice(0, 10),
        }
      ];
    } else {
      sourceData = []
    }

    return sourceData;
  }

  getSoldProducts(memoNumber: string){
    if(memoNumber.toLowerCase().includes('kg'))
      return [
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

    return [
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
  }
}
