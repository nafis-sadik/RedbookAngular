import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Observable, map, of } from "rxjs";
import { ICommonAttribute } from "../Models/ICommonAttribute";

@Injectable({
    providedIn: 'root',
})
export class CategoryService{
    baseUrl = environment.baseUrlInventory;

    constructor(private http: HttpClient) { }

    addNewAttribute(commonAttributeModel: ICommonAttribute): Observable<ICommonAttribute>{
        return this.http
           .post<ICommonAttribute>(`${this.baseUrl}/api/Category`, commonAttributeModel)
           .pipe(map((response) => response));
    }

    updateExistingAttribute(commonAttributeModel: ICommonAttribute): Observable<ICommonAttribute>{
        return this.http
           .patch<ICommonAttribute>(`${this.baseUrl}/api/Category/`, commonAttributeModel)
           .pipe(map((response) => response));
    }

    getAttributes(): Observable<Array<ICommonAttribute>>{
      return this.http
       .get<Array<ICommonAttribute>>(`${this.baseUrl}/api/Category/Quantity`)
       .pipe(map(response => response));
    }

    deleteAttribute(attributeId: number): Observable<ICommonAttribute>{
        return this.http
           .delete<ICommonAttribute>(`${this.baseUrl}/api/Category/${attributeId}`)
           .pipe(map((response) => response));
    }
}