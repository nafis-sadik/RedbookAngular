export declare interface ITableModel{
  /**
   * Labels for collumn of HTML table
   * @type {Array<string>}
   */
  columnNames: Array<string>;
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
   * @type {Array<Array<anyh>>}
   */
  sourceData: Array<Array<any>>;
}
