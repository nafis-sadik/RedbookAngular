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

    constructor(
      private http: HttpClient,
      private cachingService: CachingService
    ) { }

    addNewRoute(routeModel: IRouteModel): Observable<IRouteModel>{
        return this.http
            .post<IRouteModel>(`${this.baseUrl}/api/Route`, routeModel)
            .pipe(map((response) => response));
    }

    updateNewRoute(routeModel: IRouteModel): Observable<IRouteModel>{
        return this.http
            .put<IRouteModel>(`${this.baseUrl}/api/Route`, routeModel)
            .pipe(map(response => {
              this.cachingService.remove(`${this.baseUrl}/api/Route/GetAll/`)
              return response
            }));
    }

    getPagedRoute(pagedRouteModel: IPaginationModel<IRouteModel>): Observable<any>{
      if(pagedRouteModel.searchingConfig?.searchString){        
        return this.http
            .get<IPaginationModel<IRouteModel>>(`${this.baseUrl}/api/Route/GetPaged?PageNumber=${pagedRouteModel.pagingConfig?.pageNumber}&PageSize=${pagedRouteModel.pagingConfig?.pageLength}&SearchString=${pagedRouteModel.searchingConfig?.searchString}`)
            .pipe(map(response => {
              this.cachingService.remove(`${this.baseUrl}/api/Route/GetAll/`)
              return response
            }));
      } else {
        return this.http
          .get<IPaginationModel<IRouteModel>>(`${this.baseUrl}/api/Route/GetPaged?PageNumber=${pagedRouteModel.pagingConfig?.pageNumber}&PageSize=${pagedRouteModel.pagingConfig?.pageLength}`)
          .pipe(map(response => {
            this.cachingService.remove(`${this.baseUrl}/api/Route/GetAll/`)
            return response
          }));
      }
    }

    getAllRoute(): Observable<Array<IRouteModel>>{
      let cachedRoutes: Array<IRouteModel> = this.cachingService.get(`${this.baseUrl}/api/Route/GetAll/`);
      if(!cachedRoutes){
        return this.http
          .get<Array<IRouteModel>>(`${this.baseUrl}/api/Route/GetAll/`)
          .pipe(map((response) => {
            if(response && response.length > 0)
              this.cachingService.set(`${this.baseUrl}/api/Route/GetAll/`, response);
            return response;
          }));
      }

      return of(cachedRoutes);
    }
}
