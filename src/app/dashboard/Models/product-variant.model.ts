export class ProductModel{
    /**
     * Variant Id
     * @type {number}
     */
    VariantId: number;

    /**
     * Variant Name
     * @type {string}
     */
    VariantName: string;

    /**
     * Quantity of the variant currently available in stock
     * @type {number}
     */
    Quantity: number;

    /**
     * Product Id of the product this variant belongs to
     * @type {number}
     */
    ProductId: number;
}