import { Injectable } from "@angular/core";
import { IRouteModel } from "../Models/IRouteModel";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Observable, map, of } from "rxjs";
import { IPaginationModel } from "src/app/shared/ngx-pagination/Models/IPaginationModel";
import { CachingService } from "./caching.service";

@Injectable({
    providedIn: 'root',
})
export class RouteService{
  baseUrl = environment.baseUrl;
  appId = environment.appId

  constructor(
    private http: HttpClient,
    private cachingService: CachingService
  ) { }

  addNewRoute(routeModel: IRouteModel): Observable<IRouteModel>{
      return this.http
          .post<IRouteModel>(`${this.baseUrl}/api/Route`, routeModel)
          .pipe(map(response => {
            this.cachingService.remove(`${this.baseUrl}/api/Route/GetAppRoutes`);
            return response
          }));
  }

  updateNewRoute(routeModel: IRouteModel): Observable<IRouteModel>{
      return this.http
          .put<IRouteModel>(`${this.baseUrl}/api/Route`, routeModel)
          .pipe(map(response => {
            this.cachingService.remove(`${this.baseUrl}/api/Route/GetAppRoutes`);
            return response
          }));
  }

  getPagedRoute(pagedRouteModel: IPaginationModel<IRouteModel>): Observable<any>{
    if(pagedRouteModel.searchingConfig?.searchString){
      return this.http
          .get<IPaginationModel<IRouteModel>>(`${this.baseUrl}/api/Route/GetPaged?PageNumber=${pagedRouteModel.pagingConfig?.pageNumber}&PageLength=${pagedRouteModel.pagingConfig?.pageLength}&SearchString=${pagedRouteModel.searchingConfig?.searchString}`)
          .pipe(map(response => response ));
    } else {
      return this.http
        .get<IPaginationModel<IRouteModel>>(`${this.baseUrl}/api/Route/GetPaged?PageNumber=${pagedRouteModel.pagingConfig?.pageNumber}&PageLength=${pagedRouteModel.pagingConfig?.pageLength}`)
        .pipe(map(response => response ));
    }
  }

  getRoutesByRole(roleId: number): Observable<Array<IRouteModel>>{   
    return this.http
        .get<Array<IRouteModel>>(`${this.baseUrl}/api/Route/GetRoutesByRoleId/${roleId}`)
        .pipe(map(response => response ));
  }

  getAllRoute(): Observable<Array<IRouteModel>>{
    let cachedRoutes: Array<IRouteModel> = this.cachingService.get(`${this.baseUrl}/api/Route/GetAppRoutes`);
    if(!cachedRoutes){
      return this.http
        .get<Array<IRouteModel>>(`${this.baseUrl}/api/Route/GetAppRoutes`)
        .pipe(map((response) => {
          if(response && response.length > 0)
            this.cachingService.set(`${this.baseUrl}/api/Route/GetAppRoutes`, response);
          return response;
        }));
    }

    return of(cachedRoutes);
  }

  deleteRoute(appId: number): Observable<any>{
    this.cachingService.remove(`${this.baseUrl}/api/Route/GetAppRoutes`);
    return this.http
      .delete(`${this.baseUrl}/api/Route/${appId}`)
      .pipe(map(response => response));
  }
}
