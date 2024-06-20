import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAddressModel } from 'src/app/dashboard/Models/IAddressModel';
import { IPaymentModel } from 'src/app/dashboard/Models/IPaymentModel';
import { ProductModel } from 'src/app/dashboard/Models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AddPurchaseService {
    baseUrl = environment.baseUrlUMS;

    constructor(private http: HttpClient) { }
    getAddressesOfOutlet(selectedOutletId: number): Observable<Array<IAddressModel>> {
        return new Observable<Array<IAddressModel>>();
    }

    getPaymentsByInvoiceId(invoiceId: number): Observable<Array<IPaymentModel>> {
        return new Observable<Array<IPaymentModel>>();
    }
}
