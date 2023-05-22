export declare interface IPaginationModel<T>{
  /**
   * Heading for the card that shall contain the table
   * @type {string}
   */
  tableCardHeader: string;
  /**
   * Collumn names for table
   * @type {[key: string]: string}
   */
  tableMaping: {[key: string]: string};
  /**
   * Defines if table is editable table or not
   * @type {boolean}
   */
  isEditableTable: boolean;
  /**
   * View edit button in action column
   * @type {boolean}
   */
  allowEdit: boolean;
  /**
   * View remove button in action column
   * @type {boolean}
   */
  allowDelete: boolean;
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
  sourceData: T[];
}
