export declare interface ITableConfig{
  /**
   * Labels for collumn of HTML table
   * @type {string}
   */
  columnNames: string[];
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
   * Data source for table to render
   * @type {string}
   */
  sourceData: string[];
}
