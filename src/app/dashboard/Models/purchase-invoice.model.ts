import { ProductModel } from "./product.model";
import { PurchaseDetailsModel } from "./purchase-details.model";

export class PurchaseInvoiceModel{
  /**
   * The unique identifier for the purchase invoice.
   * @type {number}
   */
  invoiceId: number = 0;

  /**
   * The total purchase price for the invoice.
   * @type {number}
   */
  totalPurchasePrice: number = 0;

  /**
   * The unique identifier for the organization associated with the purchase invoice.
   * @type {number}
   */
  organizationId: number = 0;

  /**
   * The unique identifier for the purchase invoice.
   * @type {string}
   */
  chalanNumber: string = '';

  /**
   * The remarks associated with the purchase invoice.
   * @type {string}
   */
  remarks: string = '';

  /**
   * The terms and conditions associated with the purchase invoice.
   * @type {string}
   */
  terms: string = '';

  /**
   * The unique identifier for the vendor associated with the purchase invoice.
   * @type {number | null;}
   */
  vendorId: number | null = null;

  /**
   * An array of purchase details associated with the purchase invoice.
   * @type {Array<PurchaseDetailsModel>}
   */
  purchaseDetails: Array<PurchaseDetailsModel> = [];
  /**
   * An array of product models associated with the purchase invoice.
   * @type {Array<ProductModel>}
   */
  invoiceProducts: Array<ProductModel> = [];
}
