import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { IOrganizationModel } from "../Models/IOrganizationModel";
import { Observable, ObservableLike, map, of } from "rxjs";
import { CachingService } from "./caching.service";
import { IUserModel } from "../Models/IUserModel";
import { IPaginationModel } from "src/app/shared/ngx-pagination/Models/IPaginationModel";

@Injectable({
    providedIn: 'root',
})
export class OrganizationService{
    baseUrl = environment.baseUrl;

    constructor(
      private cachingService: CachingService,
      private http: HttpClient,
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

    addUserToBusiness(userModel: IUserModel): Observable<any>{
      return this.http
          .post<IOrganizationModel>(`${this.baseUrl}/api/Organization/Users`, userModel)
          .pipe(map((response) => response));
    }

    getUserByBusinessId(pagedUserModel: IPaginationModel<IUserModel>, businessId: number): Observable<any>{
      return this.http
            .get<IPaginationModel<IUserModel>>(`${this.baseUrl}/api/Organization/Users?SearchString=${pagedUserModel.searchingConfig?.searchString}&PageNumber=${pagedUserModel.pagingConfig?.pageNumber}&PageLength=${pagedUserModel.pagingConfig?.pageLength}&businessId=${businessId}`)
            .pipe(map(response => response));
    }

    removeUserFromBusiness(userId: number, orgId: number): Observable<any>{      
      return this.http
          .delete(`${this.baseUrl}/api/Organization/RemoveUser/${userId}/${orgId}`)
          .pipe(map((response) => response));
    }
}
