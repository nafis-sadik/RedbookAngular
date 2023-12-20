import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment.development";
import { IUserModel } from "../Models/IUserModel";
import { CachingService } from "./caching.service";

@Injectable({ 
    providedIn: 'root',
})
export class UserService{
    baseUrl = environment.baseUrl;

    constructor(
      private http: HttpClient,
      private cachingService: CachingService
    ) {}
    
    registerNewUser(userModel: IUserModel):Observable<IUserModel> {
        return this.http
            .post<IUserModel>(`${this.baseUrl}/api/User`, userModel)
            .pipe(map((response) => response));
    }
    
    updateUser(userModel: IUserModel):Observable<IUserModel> {
        return this.http
            .put<IUserModel>(`${this.baseUrl}/api/User`, userModel)
            .pipe(map((response) => response));
    }
}