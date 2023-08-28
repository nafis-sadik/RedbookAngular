export declare interface IUserModel{
  /**
   * Unique Identifier of specific user
   * @type {string}
   */
  UserId: string;
  /**
   * Email address of user
   * @type {string}
   */
  Email: string;
  /**
   * User name of user
   * @type {string}
   */
  UserName: string;
  /**
   * First name of user
   * @type {string}
   */
  FirstName: string;
  /**
   * User name of user
   * @type {string}
   */
  LastName: string;
  /**
   * User name of user
   * @type {string}
   */
  Password: string;
  /**
   * Identifier of user role
   * @type {number}
   */
  RoleId: number;
  /**
   * Name of user role
   * @type {string}
   */
  RoleName: string;
  /**
   * Identifier of user organization
   * @type {number}
   */
  OrganizationId: number;
  /**
   * Name of user Organization
   * @type {string}
   */
  OrganizationName: string;
  /**
   * Current account balance of user
   * @type {number}
   */
  AccountBalance: number;
}
