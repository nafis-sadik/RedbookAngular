import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Observable, map } from "rxjs";
import { IPaginationModel } from "src/app/shared/ngx-pagination/Models/IPaginationModel";
import { ProductModel } from "../Models/product.model";

@Injectable({
    providedIn: 'root',
})

export class ProductService {
  baseUrl = environment.baseUrlInventory;

  constructor(private http: HttpClient) { }

  getProductList(outletId: number, pagedProductModel: IPaginationModel<ProductModel>): Observable<any>{
    if(pagedProductModel.searchingConfig?.searchString){
      return this.http
          .get<any>(`${this.baseUrl}/api/Product/${outletId}?PageNumber=${pagedProductModel.pagingConfig?.pageNumber}&PageLength=${pagedProductModel.pagingConfig?.pageLength}&SearchString=${pagedProductModel.searchingConfig?.searchString}`)
          .pipe(map(response => response ));
    } else {
      return this.http
          .get<any>(`${this.baseUrl}/api/Product/${outletId}?PageNumber=${pagedProductModel.pagingConfig?.pageNumber}&PageLength=${pagedProductModel.pagingConfig?.pageLength}`)
          .pipe(map(response => response ));
    }
  }

  addProduct(productModel: ProductModel): Observable<ProductModel> {
    return this.http
      .post<ProductModel>(`${this.baseUrl}/api/Product`, productModel)
      .pipe(map((response: ProductModel) => response));
  }

  updateProduct(productModel: ProductModel): Observable<ProductModel> {
    return this.http
      .patch<ProductModel>(`${this.baseUrl}/api/Product`, productModel)
      .pipe(map((response: ProductModel) => response));
  }
}
