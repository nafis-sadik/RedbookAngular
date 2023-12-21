import { IRoleModel } from "./IRoleModel";

export declare interface IUserModel{
  /**
   * Unique Identifier of specific user
   * @type {string}
   */
  userId: string;
  /**
   * Email address of user
   * @type {string}
   */
  email: string;
  /**
   * User name of user
   * @type {string}
   */
  userName: string;
  /**
   * First name of user
   * @type {string}
   */
  firstName: string;
  /**
   * User name of user
   * @type {string}
   */
  lastName: string;
  /**
   * User name of user
   * @type {string}
   */
  password: string;
  /**
   * User roles
   * @type {IRoleModel[]}
   */
  roles: IRoleModel[];
  /**
   * User role identifiers
   * @type {number[]}
   */
  roleIds: number[];
  /**
   * User role names for display purpose only
   * @type {string}
   */
  roleNames: string;
  /**
   * Identifier of user organization
   * @type {number}
   */
  organizationId: number;
  /**
   * Name of user Organization
   * @type {string}
   */
  organizationName: string;
  /**
   * Current account balance of user
   * @type {number}
   */
  accountBalance: number;
  /**
   * Primary Key of app the user is being registered to
   * @type {number | undefined}
   */
  ApplicationId: number | undefined;
}
