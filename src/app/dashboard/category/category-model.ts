export declare class CategoryModel{
    /**
     * Item Title
     * @type {Number}
     */
    categoryId: Number;
    /**
     * Item Title
     * @type {Number}
     */
    parentCategoryId: Number | undefined;
    /**
     * Item relative link (for routerLink)
     * @type {string}
     */
    title: string;
}