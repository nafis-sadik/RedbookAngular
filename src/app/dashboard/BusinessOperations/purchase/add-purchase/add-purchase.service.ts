import { Injectable } from '@angular/core';
import { IPaymentModel } from 'src/app/dashboard/Models/IPaymentModel';
import { IProductModel } from 'src/app/dashboard/Models/IProductModel';

@Injectable({
    providedIn: 'root',
})
export class AddPurchaseService {
    getAddressesOfOutlet(selectedOutletId: number): import("../../../Models/IAddressModel").IAddressModel[] {
        if(selectedOutletId == 1)
            return [
                {
                    AddressId: 1,
                    FullAddress: 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400'
                },
                {
                    AddressId: 2,
                    FullAddress: 'Test Address'
                }
            ];
        else
            return [
                {
                    AddressId: 1,
                    FullAddress: 'Test Address 1'
                },
                {
                    AddressId: 2,
                    FullAddress: 'Test Address 2'
                }
            ];
    }

    getProductsByBusinessId(businessId: number): IProductModel[]{
        if (businessId == 1)
            return [
                    {
                        productId: 4,
                        categoryId: 1,
                        categoryName: 'Motors',
                        subcategoryId: 2,
                        subcategoryName: 'VVTi',
                        productName: '2ZR-FE',
                        purchasePrice: 80000,
                        retailPrice: 100000,
                        quantity: null,
                        organizationId: 0
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
                        quantity: null,
                        organizationId: 0
                    }
                ];
        else
            return [
                    {
                        productId: 1,
                        categoryId: 1,
                        categoryName: 'Motors',
                        subcategoryId: 2,
                        subcategoryName: 'EFI',
                        productName: '4E-FE',
                        purchasePrice: 80000,
                        retailPrice: 100000,
                        quantity: null,
                        organizationId: 0
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
                        quantity: null,
                        organizationId: 0
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
                        quantity: null,
                        organizationId: 0
                    }
                ];
    }

    getPaymentsByInvoiceId(invoiceId: number): IPaymentModel[]{
        return [
            {
                id: 1,
                InvoiceId: invoiceId,
                InvoiceTotalAmount: 500,
                PaymentAmount: 0,
                PaymentDate: new Date().toISOString().slice(0, 10),
                TotalDueAmount: 0
            },
            {
                id: 3,
                InvoiceId: invoiceId,
                InvoiceTotalAmount: 300,
                PaymentAmount: 0,
                PaymentDate: new Date().toISOString().slice(0, 10),
                TotalDueAmount: 0
            },
            {
                id: 5,
                InvoiceId: invoiceId,
                InvoiceTotalAmount: 700,
                PaymentAmount: 0,
                PaymentDate: new Date().toISOString().slice(0, 10),
                TotalDueAmount: 0
            }
        ];
    }
}
