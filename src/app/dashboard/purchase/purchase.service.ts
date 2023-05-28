import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PurchaseService {
    /**
     * Primary key of selected outlet
     */
    selectedOutletId: number = 0;
}