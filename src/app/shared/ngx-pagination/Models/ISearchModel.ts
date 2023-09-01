export declare interface ISearchModel {
  /**
   * Default value: null
   * Description: Text to search in database
   * @type {string}
   */
  searchString: string | null;
  /**
   * Default value: 'Search Here'
   * Description: Place holder text for search input field
   * @type {string}
   */
  inputFieldPlaceholder: string;
  /**
   * Default value: null
   * Description: Label of search button
   * @type {string}
   */
  searchButtonLabel: string | null;
  /**
   * Default value: true
   * Description: View search icon visibility
   * @type {boolean}
   */
  showSearchIcon: boolean;
  /**
   * Default value: null
   * Description: Callback method for onClick event
   * @type {Function}
   */
  onClick: Function;
}
