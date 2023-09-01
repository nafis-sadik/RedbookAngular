import { Injectable } from "@angular/core";
import { IRouteModel } from "../Models/IRouteModel";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Observable, map } from "rxjs";
import { IPaginationModel } from "src/app/shared/ngx-pagination/Models/IPaginationModel";

@Injectable({ 
    providedIn: 'root',
})
export class RouteService{
    baseUrl = environment.baseUrl;

    constructor(
      private http: HttpClient,
    ) { }
    
    addNewRoute(routeModel: IRouteModel): Observable<IRouteModel>{
        console.log(`${this.baseUrl}/api/Route`)
        return this.http
            .post<IRouteModel>(`${this.baseUrl}/api/Route`, routeModel)
            .pipe(map((response) => response));
    }
    
    updateNewRoute(routeModel: IRouteModel): Observable<IRouteModel>{
        return this.http
            .put<IRouteModel>(`${this.baseUrl}/api/Route`, routeModel)
            .pipe(map((response) => response));
    }

    getPagedRoute(pagedRouteModel: IPaginationModel<IRouteModel>): Observable<any>{
        return this.http
            .get<IPaginationModel<IRouteModel>>(`${this.baseUrl}/api/Route/GetPaged?PageNumber=${pagedRouteModel.pagingConfig?.pageNumber}&PageSize=${pagedRouteModel.pagingConfig?.pageLength}`)
            .pipe(map((response) => response));
    }

    getAllRoute(userId: string){
        return this.http
            .get<Array<IRouteModel>>(`${this.baseUrl}/api/Route/GetAll/${userId}`)
            .pipe(map((response) => response));
    }
}