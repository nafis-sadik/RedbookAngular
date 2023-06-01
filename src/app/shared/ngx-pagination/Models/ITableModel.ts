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
   * Data source for table to render
   * @type {Array<Array<anyh>>}
   */
  sourceData: Array<Array<any>>;
  /**
   * Default value: null
   * Description: Callback method for onClick event on edit button
   * @type {Function}
   */
  onEdit: Function | null
  /**
   * Default value: null
   * Description: Callback method for onClick event on delete button
   * @type {Function}
   */
  onDelete: Function | null
}
