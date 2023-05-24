export declare interface ISearchModel{
  /**
   * Default value: null
   * Description: Text to search in database
   * @type {Number}
   */
  searchString: string | null,
  /**
   * Default value: 'Search Here'
   * Description: Place holder text for search input field
   * @type {Number}
   */
  inputFieldPlaceholder: string
  /**
   * Default value: null
   * Description: Label of search button
   * @type {Number}
   */
  searchButtonLabel: string | null,
  /**
   * Default value: true
   * Description: View search icon visibility
   * @type {Number}
   */
  showSearchIcon: boolean,
}
