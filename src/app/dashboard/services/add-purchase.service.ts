import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddressModel } from 'src/app/dashboard/Models/IAddressModel';
import { IPaymentModel } from 'src/app/dashboard/Models/IPaymentModel';
import { ProductModel } from 'src/app/dashboard/Models/product.model';

@Injectable({
    providedIn: 'root',
})
export class AddPurchaseService {
    getAddressesOfOutlet(selectedOutletId: number): Observable<Array<IAddressModel>> {
        return new Observable<Array<IAddressModel>>();
    }

    getProductsByBusinessId(businessId: number): Observable<Array<ProductModel>> {
        return new Observable<Array<ProductModel>>();
    }

    getPaymentsByInvoiceId(invoiceId: number): Observable<Array<IPaymentModel>> {
        return new Observable<Array<IPaymentModel>>();
    }
}
