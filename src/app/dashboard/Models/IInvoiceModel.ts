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
   * Total bill amount of this invoice
   * @type {Number}
   */
  InvoiceTotal: number;
  /**
   * Total due amount of this invoice
   * @type {Number}
   */
  DueAmount: number;
  /**
   * Total paid amount of this invoice
   * @type {Number}
   */
  PaidAmount: number;
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
  Terms: string;
  /**
   * Discount amount on this Invoice
   * @type {string}
   */
  Discount: number;
  /**
   * Addresses of the invoice issuer to be printed in UI
   * @type { [key: number]: string }
   */
  address: { [key: number]: string }[];
  /**
   * Primary keys of selected addresses to be printed on final invoice
   * @type {number[]}
   */
  selectedAddresses: number[];
  /**
   * Primary keys of selected products to be purchased against this invoice
   * @type {number[]}
   */
  selectedProducts: number[];
}
