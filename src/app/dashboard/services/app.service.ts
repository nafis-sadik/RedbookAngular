import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: 'root',
})
export class AppService{
    baseUrl = environment.baseUrl;
    
    constructor(private http: HttpClient) { }

    getAllApplications(){
        return this.http
            .get<any>(`${this.baseUrl}/api/Application/GetAll`)
            .pipe(map((response) => response));
    }
}
