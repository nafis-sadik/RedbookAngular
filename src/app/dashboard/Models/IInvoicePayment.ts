
export declare interface IInvoicePaymentModel{
  /**
   * Total bill amount of this invoice
   * @type {Number}
   */
  InvoiceTotal: number;
  /**
   * Discount amount on this Invoice
   * @type {string}
   */
  Discount: number;
  /**
   * Total paid amount of this invoice
   * @type {Number}
   */
  PaidAmount: number;
  /**
   * Total due amount of this invoice
   * @type {Number}
   */
  DueAmount: number;
  /**
   * Total due amount of this invoice
   * @type {Date | string}
   */
  PaymentDate: Date | string;
}
