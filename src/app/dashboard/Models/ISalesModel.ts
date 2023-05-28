export declare interface ISalesModel {
    /**
     * Sales record Id
     * @type {Number}
     */
    id: number;

    /**
     * Sales invoice/Cash memo number
     * @type {string}
     */
    MemoNumber: string;

    /**
     * Net total of cash memo
     * @type {number}
     */
    NetTotal: number;

    /**
     * Amount paid by the customer
     * @type {number}
     */
    PaidAmount: number;

    /**
     * Net total of cash memo
     * @type {Date | string}
     */
    SalesDate: Date | string;
}