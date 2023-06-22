export declare interface IInvoiceProductModel{
  /**
   * Unique Identifier of selected product
   * @type {number}
   */
  ProductId: number;
  /**
   * Product Name of selected product
   * @type {string}
   */
  ProductName: string;
  /**
   * Quantity of selected product
   * @type {number}
   */
  Quantity: number;
  /**
   * Selling price of product
   * @type {number}
   */
  RetailPrice: number;
  /**
   * Purchasing price of product
   * @type {number}
   */
  PurchasePrice: number;
  /**
   * Total amount of money against selected product
   * @type {number}
   */
  ProductNetTotalPrice: number;
}
