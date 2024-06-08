import { Injectable } from '@angular/core';
import { PurchaseInvoiceModel } from '../Models/purchase-invoice.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class PurchaseService {
  constructor(private http: HttpClient) { }

  getInvoiceList(outletId: number, pageNumber: number, pageLength: number, searchString: string): Observable<Array<PurchaseInvoiceModel>> {
    return this.http
      .get<Array<PurchaseInvoiceModel>>(`http://localhost:5000/api/purchase/getInvoiceList?outletId=${outletId}&pageNumber=${pageNumber}&pageLength=${pageLength}&searchString=${searchString}`)
      .pipe(map(response => response));
  }
}
