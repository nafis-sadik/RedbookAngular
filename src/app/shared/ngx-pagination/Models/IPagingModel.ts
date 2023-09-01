export declare interface IPagingModel {
  /**
   * Default value:
   * Description: Selected page number
   * @type {Number}
   */
  pageNumber: number;
  /**
   * Nullable field:
   * Default value:
   * Description: This array shall be visible as a dropdown at the UI to let users select the number of items they wish to see in a single page in the table
   * @type {Array<number>}
   */
  pageLengthOptions: Array<number>;
  /**
   * Nullable field: Yes
   * Default value: 0
   * Description: Default value for pagination options, Must be and index number of 'pageLengthOptions'.
   * @type {Number}
   */
  pageLength: number;
  /**
   * Nullable field: Yes
   * Default value: 0
   * Description: Number of total pages based on currently selected page length
   * @type {Number}
   */
  totalPageCount: number;
  /**
   * Nullable field: Yes
   * Default value: 0
   * Description: Number of total pages based on currently selected page length
   * @type {Function}
   */
  updateList: Function;
}
