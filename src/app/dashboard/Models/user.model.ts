import { environment } from "src/environments/environment.development";

export class UserModel{
  /**
   * Unique Identifier of specific user
   * @type {number}
   */
  userId: number;
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
   * Current account balance of user
   * @type {number}
   */
  accountBalance: number;
  /**
   * User role ids in number array
   * @type {Array<number>}
   */
  userRoleIds: Array<number>;
  /**
   * User role names in string array
   * @type {Array<string>}
   */
  userRoles: Array<string>;
  /**
   * Application id of the application this user is making the request from
   * @type {Array<string>}
   */
  applicationId: number = Number(environment.appId);
  /**
   * Id of the organization that the user is associated with and trying to run the operation upon
   * @type {Array<string>}
   */
  organizationId: number = 0;
}
