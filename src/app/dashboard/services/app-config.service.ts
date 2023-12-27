import jwt_decode from 'jwt-decode';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AppConfigurationService{
  private _userRawData: any;
  public get UserRawData(): any {
    return this._userRawData;
  }
  public set UserRawData(value: any) {
    this._userRawData = value;
  }
  private _userModelData: any;
  public get UserModelData(): any {
    return this._userModelData;
  }
  public set UserModelData(value: any) {
    this._userModelData = value;
  }

  constructor(){
    let tokenString: string = localStorage['auth_app_token'];
    let tokenJson = JSON.parse(tokenString);
    let token = tokenJson.value;
    console.log('jwt', token);
    this._userRawData = jwt_decode(token);
    console.log('decoded', this._userRawData);
    this.UserModelData = {
      userId: this._userRawData.UserId,
      userName: this._userRawData.UserName,
      userRoles: this._userRawData.UserRoles,
      userRoleIds: this._userRawData.UserRoleIds,
      organizationId: this._userRawData.OrganizationId
    }
  }

  isMobilePhone(): boolean {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobi/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    return isMobile && !isTablet;
  }
}
