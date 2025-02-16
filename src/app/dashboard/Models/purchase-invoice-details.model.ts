import { ProductVariantModel } from "./product-variant.model";

export class PurchaseInvoiceDetailsModel {
    /**
     * The unique identifier for the purchase details.
     * @type {number}
     */
    recordId: number = 0;
    /**
     * The unique identifier for the purchase invoice.
     * @type {number}
     */
    invoiceId: number = 0;
    /**
     * The unique identifier for the product associated with the purchase details.
     * @type {number}
     */
    productId: number = 0;
    /**
     * The unique identifier for the variant of the selected product that is being purchased under this invoice.
     * @type {number}
     */
    productVariantId: number = 0;
    /**
     * The name of the product associated with the purchase details.
     * @type {string}
     */
    productName: string = '';
    /**
     * The quantity of the product associated with the purchase details.
     * @type {number}
     */
    quantity: number = 0;
    /**
     * The total price of the product details. (Considering unit price and quantity)
     * @type {number}
     */
    discount: number = 0;
    /**
     * The total price of the product details. (Considering unit price and quantity)
     * @type {number}
     */
    vatRate: number = 0;
    /**
     * The unit price of the product associated with the purchase details.
     * @type {number}
     */
    purchasePrice: number = 0;
    /**
     * Retail price of this product
     * @type {number}
     */
    retailPrice: number = 0;
    /**
     * The total price of the product details. (Considering unit price and quantity)
     * @type {number}
     */
    totalPrice: number = 0;
    /**
     * Array of product variants of the selected product
     */
    variants: Array<ProductVariantModel> = [];
}