import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { CachingService } from "./caching.service";
import { Observable, map, of } from "rxjs";
import { ICategoryModel } from "../Models/ICategoryModel";

@Injectable({
    providedIn: 'root',
})
export class CategoryService{
    baseUrl = environment.baseUrlInventory;
    
    constructor(
      private http: HttpClient,
      private cacheingService: CachingService
    ) { }

    addNewCategory(categoryModel: ICategoryModel): Observable<ICategoryModel>{
        return this.http
            .post<ICategoryModel>(`${this.baseUrl}/api/Category`, categoryModel)
            .pipe(map((response) => response));
    }

    updateCategory(categoryModel: ICategoryModel): Observable<ICategoryModel>{
        return this.http
            .patch<ICategoryModel>(`${this.baseUrl}/api/Category/`, categoryModel)
            .pipe(map((response) => response));
    }

    deleteCategory(categoryId: number): Observable<ICategoryModel>{
        return this.http
            .delete<ICategoryModel>(`${this.baseUrl}/api/Category/${categoryId}`)
            .pipe(map((response) => response));
    }

    getCategoriesUnderOrganization(orgId: number): Observable<Array<ICategoryModel>>{
        let cachedData: Array<ICategoryModel> = this.cacheingService.get(`${this.baseUrl}/api/Category/${orgId}`);
        if(!cachedData){
            return this.http
            .get<any>(`${this.baseUrl}/api/Category/${orgId}`)
            .pipe(map((response) => {
                console.log('response', response);
                this.cacheingService.set(`${this.baseUrl}/api/Category/${orgId}`, response);
                return response;
            }));
        }
        
        return of(cachedData);
    }
}