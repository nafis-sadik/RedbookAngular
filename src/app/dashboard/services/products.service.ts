import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProductModel } from "src/app/dashboard/Models/IProductModel";
import { CachingService } from "./caching.service";
import { environment } from "src/environments/environment.development";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class ProductService {
  baseUrl = environment.baseUrlInventory;

  constructor(
    private http: HttpClient,
    private cachingService: CachingService
  ) { }
  
  getProductList(outletId: number, pageNumber: number, pageLength: number, searchString: string): IProductModel[]{
    let sourceData: IProductModel[];
    if(outletId == 1){
      sourceData = [
        {
          productId: 1,
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
          productId: 2,
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
          productId: 3,
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
          productId: 4,
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
          productId: 5,
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

  addProduct(productModel: IProductModel): Observable<IProductModel> {
    return this.http
      .post<IProductModel>(`${this.baseUrl}/api/Product/AddProduct`, productModel)
      .pipe(map((response: IProductModel) => response));
  }

  updateProduct(productModel: IProductModel): Observable<IProductModel> {
    return this.http
      .post<IProductModel>(`${this.baseUrl}/api/Product/UpdateProduct`, productModel)
      .pipe(map((response: IProductModel) => response));
  }
}
