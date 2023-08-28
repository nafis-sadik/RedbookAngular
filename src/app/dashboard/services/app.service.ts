import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AppService{
  isMobilePhone(): boolean {
    const userAgent = navigator.userAgent;
    const isMobile = /Mobi/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    return isMobile && !isTablet;
  }
}
