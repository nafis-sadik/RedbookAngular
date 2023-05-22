export declare interface IProductModel{
    /**
     * Product Id
     * @type {Number}
     */
    id: number;
    /**
     * Product Category or Subcategory Id
     * @type {Number}
     */
    categoryId: number;
    /**
     * Product Category or Subcategory Name
     * @type {string}
     */
    categoryName: string;
    /**
     * Product subcategory or Subcategory Id
     * @type {Number}
     */
    subcategoryId: number;
    /**
     * Product subcategory or Subcategory Name
     * @type {string}
     */
    subcategoryName: string;
    /**
     * Product Name
     * @type {string}
     */
    productName: string;
    /**
     * Product purchase price
     * @type {Number}
     */
    price: number;
    /**
     * Product retail price
     * @type {Number}
     */
    retailPrice: number;
}
