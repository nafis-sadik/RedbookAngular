import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment.development";
import { IUserModel } from "../Models/IUserModel";

@Injectable({ 
    providedIn: 'root',
})
export class UserService{
    baseUrl = environment.baseUrl;

    constructor(
      private http: HttpClient,
    ) {}

    registerNewUser(orgModel: IUserModel):Observable<IUserModel> {
        return this.http
            .post<IUserModel>(`${this.baseUrl}/api/User`, orgModel)
            .pipe(map((response) => response));
    }
}