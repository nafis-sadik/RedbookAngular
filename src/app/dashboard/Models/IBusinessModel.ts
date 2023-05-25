export declare interface IBusinessModel{
    /**
     * Item Title
     * @type {Number}
     */
    businessId: number;
    /**
     * Business Owner Id
     * @type {string}
     */
    ownerId: string;
    /**
     * Business Title
     * @type {string}
     */
    title: string;
    /**
     * Collection of addresses of a business with corresponding Address Ids
     * @type { { [ key: number ]: string }[] | null }
     */
    address: { [ key: number ]: string }[] | null;
}
