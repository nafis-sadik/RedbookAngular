export declare interface IPaginationModel<T>{
    /**
     * Selected page number
     * @type {Number}
     */
    pageNumber: number | null;
    /**
     * Number of total items in database
     * @type {Number}
     */
    totalItems: number;
    /**
     * Number of items to be viewed in each page
     * @type {Number}
     */
    itemsPerPage: number | null;
    /**
     * Array of items to be displayed in current page
     * @type {T}
     */
    itemsLoaded: T[];
}