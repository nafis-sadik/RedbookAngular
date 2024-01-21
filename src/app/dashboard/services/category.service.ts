import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Observable, map, of } from "rxjs";
import { ICategoryModel } from "../Models/ICategoryModel";

@Injectable({
    providedIn: 'root',
})
export class CategoryService{
    baseUrl = environment.baseUrlInventory;

    constructor(private http: HttpClient) { }

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
      return this.http
        .get<Array<ICategoryModel>>(`${this.baseUrl}/api/Category/${orgId}`)
        .pipe(map(response => response));
    }
}
