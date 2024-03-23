import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { IOrganizationModel } from "../Models/IOrganizationModel";
import { Observable, ObservableLike, map, of } from "rxjs";
import { CachingService } from "./caching.service";
import { UserModel } from "../Models/UserModel";
import { IPaginationModel } from "src/app/shared/ngx-pagination/Models/IPaginationModel";
import { SharedService } from "src/app/shared/common-methods";

@Injectable({
    providedIn: 'root',
})
export class OrganizationService{
  baseUrl = environment.baseUrlUMS;

  constructor(
    private http: HttpClient,
    private cachingService: CachingService,
    private sharedService: SharedService
  ) {}

  addNewOrganization(orgModel: IOrganizationModel): Observable<IOrganizationModel> {
      return this.http
          .post<IOrganizationModel>(`${this.baseUrl}/api/Organization`, orgModel)
          .pipe(map((response) => response));
  }

  updateOrganization(orgModel: IOrganizationModel): Observable<IOrganizationModel> {
      return this.http
          .put<IOrganizationModel>(`${this.baseUrl}/api/Organization`, orgModel)
          .pipe(map(response => response));
  }

  deleteOrganization(orgId: number) {
      return this.http
          .delete(`${this.baseUrl}/api/Organization/${orgId}`)
          .pipe(map(response => response));
  }

  getAllOrganizations(): Observable<IOrganizationModel[]>{
    let cachedData = this.cachingService.get(`${this.baseUrl}/api/Organization/GetAll`);
    if(!cachedData){
      return this.http
        .get<Array<IOrganizationModel>>(`${this.baseUrl}/api/Organization/GetAll`)
        .pipe(map(response => {
          this.cachingService.set(`${this.baseUrl}/api/Organization/GetAll`, response);
          return response;
        }));
    } else {
      return of(cachedData);
    }
  }

  addUserToBusiness(userModel: UserModel): Observable<any>{
    return this.http
        .post<IOrganizationModel>(`${this.baseUrl}/api/Organization/User`, userModel)
        .pipe(map((response) => response));
  }

  getUserByBusinessId(pagedUserModel: IPaginationModel<UserModel>, businessId: number): Observable<any>{
    let params = this.sharedService.paginationToParams<UserModel>(pagedUserModel);
    
    return this.http
      .get<IPaginationModel<UserModel>>(`${this.baseUrl}/api/User/${businessId}`, { params } )
          .pipe(map(response => response));
  }

  removeUserFromBusiness(userId: number, orgId: number): Observable<any>{      
    return this.http
        .delete(`${this.baseUrl}/api/Organization/User/${userId}/${orgId}`)
        .pipe(map((response) => response));
  }
}
