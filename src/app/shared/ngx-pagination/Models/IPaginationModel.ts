export declare interface IPaginationModel<T>{
  /**
   * Default value:
   * Description: Heading for the card that shall contain the table
   * @type {string}
   */
  tableCardHeader: string | null;
  /**
   * Default value:
   * Description: Array of items to be displayed in current page
   * @type {T}
   */
  sourceData: T[];
  /**
   * Default value:
   * Description: Allow add button to appeear
   * @type {boolean}
   */
  allowAdd: boolean;
  /**
   * Configuration for paging your table
   */
  tableConfig: {
    /**
     * Default value:
     * Description: Collumn names for table
     * @type {[key: string]: string}
     */
    tableMaping: { [key: string]: string };
    /**
     * Default value:
     * Description: Defines if table is editable table or not
     * @type {boolean}
     */
    isEditableTable: boolean;
    /**
     * Default value:
     * Description: View edit button in action column
     * @type {boolean}
     */
    allowEdit: boolean;
    /**
     * Default value:
     * Description: View remove button in action column
     * @type {boolean}
     */
    allowDelete: boolean;
  } | null;
  /**
   * Configuration for pages
   */
  pagingConfig: {
    /**
     * Default value:
     * Description: Selected page number
     * @type {Number}
     */
    pageNumber: number;
    /**
     * Default value:
     * Description: This array shall be visible as a dropdown at the UI to let users select the number of items they wish to see in a single page in the table
     * @type {Array<number>}
     */
    pageLengthOptions: Array<number>;
    /**
     * Default value: 0
     * Description: Default value for pagination options, Must be and index number of 'pageLengthOptions'.
     * @type {Number}
     */
    pageLength: number;
    /**
     * Default value:
     * Description: Number of total items in database
     * @type {Number}
     */
    totalItems: number;
    /**
     * Default value: null
     * Description: Callback method for onClick event
     * @type {Function}
     */
    onChange: Function | null;
  } | null;
  /**
   * Configuration for search field
   */
  searchingConfig: {
    /**
     * Default value: null
     * Description: Text to search in database
     * @type {string | null}
     */
    searchString: string | null;
    /**
     * Default value: 'Search Here'
     * Description: Place holder text for search input field
     * @type {string}
     */
    inputFieldPlaceholder: string;
    /**
     * Default value: 'Search Here'
     * Description: Place holder text for search input field
     * @type {string | null}
     */
    buttonLabel: string | null;
    /**
     * Default value: 'Search Here'
     * Description: Place holder text for search input field
     * @type {boolean}
     */
    showIcon: boolean;
    /**
     * Default value: null
     * Description: Callback method for onClick event
     * @type {Function | null}
     */
    onClick: Function | null;
  } | null;
  /**
   * Configuration for add new button
   */
  addNewElementButtonConfig: {
    /**
     * Default value: true
     * Description: View add icon visibility
     * @type {boolean}
     */
    showIcon: boolean;
    /**
     * Default value: null
     * Description: Label of search button
     * @type {string}
     */
    buttonLabel: string | null;
    /**
     * Default value: null
     * Description: Callback method for onClick event
     * @type {Function}
     */
    onClick: Function | null;
  } | null;
}
