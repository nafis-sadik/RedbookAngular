import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProductModel } from "src/app/dashboard/Models/IProductModel";
import { environment } from "src/environments/environment.development";
import { Observable, map } from "rxjs";
import { IPaginationModel } from "src/app/shared/ngx-pagination/Models/IPaginationModel";

@Injectable({
    providedIn: 'root',
})

export class ProductService {
  baseUrl = environment.baseUrlInventory;

  constructor(private http: HttpClient) { }

  getProductList(outletId: number, pagedProductModel: IPaginationModel<IProductModel>): Observable<any>{
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

  addProduct(productModel: IProductModel): Observable<IProductModel> {
    return this.http
      .post<IProductModel>(`${this.baseUrl}/api/Product`, productModel)
      .pipe(map((response: IProductModel) => response));
  }

  updateProduct(productModel: IProductModel): Observable<IProductModel> {
    return this.http
      .patch<IProductModel>(`${this.baseUrl}/api/Product`, productModel)
      .pipe(map((response: IProductModel) => response));
  }
}
