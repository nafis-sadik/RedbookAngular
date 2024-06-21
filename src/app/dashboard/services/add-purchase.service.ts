import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddressModel } from 'src/app/dashboard/Models/IAddressModel';
import { environment } from 'src/environments/environment';
import { InvoicePaymentModel } from '../Models/invoice-payment.model';

@Injectable({
    providedIn: 'root',
})
export class AddPurchaseService {
    baseUrl = environment.baseUrlUMS;

    constructor(private http: HttpClient) { }
    getAddressesOfOutlet(selectedOutletId: number): Observable<Array<IAddressModel>> {
        return new Observable<Array<IAddressModel>>();
    }

    getPaymentsByInvoiceId(invoiceId: number): Observable<Array<InvoicePaymentModel>> {
        return new Observable<Array<InvoicePaymentModel>>();
    }
}
