import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { IOrganizationModel } from "../Models/IOrganizationModel";
import { Observable, ObservableLike, map } from "rxjs";

@Injectable({ 
    providedIn: 'root',
})
export class OrganizationService{
    baseUrl = environment.baseUrl;

    constructor(
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
}