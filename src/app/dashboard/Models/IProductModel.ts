export declare interface IProductModel{
    /**
     * Product Id
     * @type {number}
     */
    productId: number;
    /**
     * Product Name
     * @type {string}
     */
    productName: string;
    /**
     * Product Category or Subcategory Id
     * @type {number}
     */
    categoryId: number;
    /**
     * Product subcategory or Subcategory Id
     * @type {number}
     */
    subcategoryId: number;
    /**
     * Product category name
     * @type {string}
     */
    categoryName: string;
    /**
     * Product subcategory name
     * @type {string}
     */
    subcategoryName: string;
    /**
     * Product purchase price
     * @type {number}
     */
    purchasePrice: number;
    /**
     * Product retail price
     * @type {number}
     */
    retailPrice: number;
    /**
     * Organization Unique Identifier
     * @type {number}
     */
    organizationId: number;
    /**
     * Purchase/Sales/Inventory Quantity
     * @type {number}
     */
    quantity: number;
    /**
     * Quantity Type Attribute (i.e. Kg, Bottle, Packets, Liter etc)
     * @type {number}
     */
    quantityTypeId: number;
    /**
     * Brand id of product, (i.e. RFL, Beximco, GE etc)
     * @type {number}
     */
    brandAttributeId: number;
}
