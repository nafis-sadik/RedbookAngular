import { Injectable } from '@angular/core';
import { PurchaseInvoiceModel } from '../Models/purchase-invoice.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, share } from 'rxjs';
import { SharedService } from 'src/app/shared/common-methods';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})

export class PurchaseService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getInvoiceList(outletId: number, pagedPurchaseModel: IPaginationModel<PurchaseInvoiceModel>): Observable<IPaginationModel<PurchaseInvoiceModel>> {
    let paramsObject: HttpParams = this.sharedService.paginationToParams<PurchaseInvoiceModel>(pagedPurchaseModel);
    paramsObject = paramsObject.append('organizationId', outletId.toString());
    return this.http
      .get<IPaginationModel<PurchaseInvoiceModel>>(`${environment.baseUrlInventory}/api/purchase/PagedAsync/`, { params: paramsObject })
      .pipe(map(response => response));
  }
}
