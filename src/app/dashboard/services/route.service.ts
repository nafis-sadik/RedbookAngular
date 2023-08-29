import { Injectable } from "@angular/core";
import { IRouteModel } from "../Models/IRouteModel";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Observable, map } from "rxjs";

@Injectable({ 
    providedIn: 'root',
})
export class RouteService{
    baseUrl = environment.baseUrl;

    constructor(
      private http: HttpClient,
    ) {}
    
    addNewRoute(routeModel: IRouteModel): Observable<IRouteModel>{
        return this.http
            .post<IRouteModel>(`${this.baseUrl}/api/Route`, routeModel)
            .pipe(map((response) => response));
    }
    
    updateNewRoute(routeModel: IRouteModel): Observable<IRouteModel>{
        return this.http
            .put<IRouteModel>(`${this.baseUrl}/api/Route`, routeModel)
            .pipe(map((response) => response));
    }
}