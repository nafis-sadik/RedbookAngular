import { Injectable } from '@angular/core';
import { IPaymentModel } from 'src/app/dashboard/Models/IPaymentModel';
import { IProductModel } from 'src/app/dashboard/Models/IProductModel';

@Injectable({
    providedIn: 'root',
})
export class AddPurchaseService {
    getAddressesOfOutlet(selectedOutletId: number): import("../../../Models/IAddressModel").IAddressModel[] {
        throw new Error("Method not implemented.");
    }

    getProductsByBusinessId(businessId: number): IProductModel[]{
        throw new Error("Method not implemented.");
    }

    getPaymentsByInvoiceId(invoiceId: number): IPaymentModel[]{
        throw new Error("Method not implemented.");
    }
}
