import { IInvoicePaymentModel } from "./IInvoicePayment";
import { PurchaseInvoiceModes } from "./purchase-invoice.model";

export declare interface IInvoiceModel{
  /**
   * Unique Identifier of the Invoices for database
   * @type {Number}
   */
  InvoiceId: number;
  /**
   * Invoice number for the user to uniquely identify each of their invoices
   * @type {string}
   */
  InvoiceNo: string;
  /**
   * Users must create invoices against clients (the entity that our user purchased from)
   * @type {Number}
   */
  ClientId: number;
  /**
   * To display the client against the invoice in the table
   * @type {string}
   */
  ClientName: string;
  /**
   * Invoice issue date (should be entered from front end)
   * @type {Date}
   */
  IssueDate: Date | string;
  /**
   * Log for last update date of invoice
   * @type {Date}
   */
  UpdateDate: Date | string;
  /**
   * Id of the Invoice
   * @type {string}
   */
  PaymentStatus: string;
  /**
   * Indentifier of payment status
   * @type {Number}
   */
  PaymentStatusId: number;
  /**
   * Primary keys of selected products to be purchased against this invoice
   * @type {IProductModel[]}
   */
  invoiceProducts: PurchaseInvoiceModes[];
  /**
   * User who created the invoice
   * @type {string}
   */
  CreatedBy: string;
  /**
   * User who last updated the invoice
   * @type {string}
   */
  UpdateBy: string;
  /**
   * Invoice notes
   * @type {string}
   */
  Notes: string;
  /**
   * Invoice terms & conditions
   * @type {string}
   */
  InvoiceTerms: string;
  /**
   * Primary keys of selected addresses to be printed on final invoice
   * @type {number[]}
   */
  selectedAddresses: number[];
  /**
   * Payment history of invoice
   * @type {number[]}
   */
  paymentHistory: IInvoicePaymentModel[];
  /**
   * Total bill against this invoice
   * @type {number[]}
   */
  InvoiceTotal: number;
  /**
   * Total paid amount against this invoice
   * @type {number[]}
   */
  PaidAmount: number;
}
