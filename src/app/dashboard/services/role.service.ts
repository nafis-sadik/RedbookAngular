import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Observable, map } from "rxjs";
import { IRoleModel } from "../Models/IRoleModel";

@Injectable({ 
    providedIn: 'root',
})
export class RoleService{
    baseUrl = environment.baseUrl;

    constructor(
      private http: HttpClient,
    ) {}

    getOrganizationRoles(orgId: number): Observable<any[]> {
        return this.http
            .get<Array<any>>(`${this.baseUrl}/api/Role/OrganizationRoles/${orgId}`)
            .pipe(map((response) => response));
    }

    addRole(role: IRoleModel): Observable<IRoleModel> {
        return this.http
            .post<IRoleModel>(`${this.baseUrl}/api/Role`, role)
            .pipe(map((response) => response));
    }

    updateRole(role: IRoleModel): Observable<IRoleModel> {
        return this.http
            .put<IRoleModel>(`${this.baseUrl}/api/Role`, role)
            .pipe(map((response) => response));
    }
}