import { ProductModel } from "./product.model";
import { PurchaseInvoiceDetailsModel } from "./purchase-invoice-details.model";
import { PurchasePaymentModel } from "./purchase-payment.model";

export class PurchaseInvoiceModel {
  /**
   * The unique identifier for the purchase invoice.
   * @type {number}
   */
  invoiceId: number = 0;

  /**
   * Purchase date for this invoice.
   * @type {string}
   */
  purchaseDate: string = '';

  /**
   * The total discount value on the invoice.
   * @type {number}
   */
  totalDiscount: number = 0;

  /**
   * The total purchase price for the invoice.
   * @type {number}
   */
  grossTotal: number = 0;

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
   * @type {number}
   */
  vendorId: number = 0;

  /**
   * An array of purchase details associated with the purchase invoice.
   * @type {Array<PurchaseInvoiceDetailsModel>}
   */
  purchaseDetails: Array<PurchaseInvoiceDetailsModel> = [];

  /**
   * An array of product models associated with the purchase invoice.
   * @type {Array<ProductModel>}
   */
  invoiceProducts: Array<ProductModel> = [];

  /**
   * Payment records associated with the purchase invoice.
   * @type {Array<PurchasePaymentModel>}
   */
  paymentRecords: Array<PurchasePaymentModel> = [];
}
