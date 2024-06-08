export class PurchaseInvoiceModel{
  /**
   * The unique identifier for the purchase invoice.
   * @type {number}
   */
  InvoiceId: number = 0;

  /**
   * The total purchase price for the invoice.
   * @type {number}
   */
  TotalPurchasePrice: number = 0;

  /**
   * The unique identifier for the organization associated with the purchase invoice.
   * @type {number}
   */
  OrganizationId: number = 0;

  /**
   * The unique identifier for the purchase invoice.
   * @type {string}
   */
  ChalanNumber: string = '';

  /**
   * The remarks associated with the purchase invoice.
   * @type {string}
   */
  Remarks: string = '';

  /**
   * The unique identifier for the vendor associated with the purchase invoice.
   * @type {number | null;}
   */
  VendorId: number | null = null;
}
