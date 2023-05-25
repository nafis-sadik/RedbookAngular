export declare interface IInvoiceModel{
  InvoiceNo: string;
  ClientId: number;
  ClientName: string;
  IssueDate: Date | string;
  UpdateDate: Date | string;
  PaymentStatus: string;
  PaymentStatusId: number;
  InvoiceTotal: number;
  DueAmount: number;
  PaidAmount: number;
  CreatedBy: string;
  UserId: string;
  Notes: string;
  Terms: string;
  Discount: number;
  address: string[];
}
