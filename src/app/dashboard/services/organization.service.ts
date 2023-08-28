import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { IOrganizationModel } from "../Models/IOrganizationModel";
import { Observable, map } from "rxjs";

@Injectable({ 
    providedIn: 'root',
})
export class OrganizationService{
    baseUrl = environment.baseUrl;

    constructor(
      private http: HttpClient,
    ) {}

    addNewOrganization(orgModel: IOrganizationModel):Observable<IOrganizationModel> {
        return this.http
            .post<IOrganizationModel>(`${this.baseUrl}/api/Organization`, orgModel)
            .pipe(map((response) => response));
    }
}