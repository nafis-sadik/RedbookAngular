export declare interface IPagingModel {
  totalPageCount: number;
  /**
   * Default value:
   * Description: Selected page number
   * @type {Number}
   */
  pageNumber: number;
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
   * Description: Number of total items based on currently selected page config
   * @type {Number}
   */
  totalItems: number;
  /**
   * Nullable field: Yes
   * Default value: 0
   * Description: Number of total pages based on currently selected page length
   * @type {Function}
   */
  onUpdate: Function;
}
