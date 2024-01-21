export declare interface ICategoryModel{
  /**
   * Id of the business that owns this category
   * @type {Number}
   */
  businessId: number;
  /**
   * Id of this category element
   * @type {Number}
   */
  categoryId: number;
  /**
   * Id of parent category element
   * @type {Number}
   */
  parentCategoryId: number | undefined;
  /**
   * Title of the Category element (Category Name)
   * @type {string}
   */
  catagoryName: string;
}
