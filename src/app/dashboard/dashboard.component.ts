import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbThemeService } from '@nebular/theme';
import { DashboardService } from './services/dashboard.service';
import { IRouteModel } from './Models/IRouteModel';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DashboardComponent {
  selectedTheme: string;
  isButtonVisible: boolean;
  themes: string[] = [
    'Default',
    'Evening',
    'Cosmic',
    'Corporate',
    'Midnight',
    'Aquamarine'
  ];

  menuOptions: NbMenuItem[];

  constructor(
    dashboardService: DashboardService,
    chageDetector: ChangeDetectorRef,
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
  ) {
    // If no theme has been cached, select default theme
    let preselectedTheme: string | null = localStorage.getItem('theme');
    if(preselectedTheme)
      this.selectedTheme = preselectedTheme;
    else
      this.selectedTheme = this.themes[0];

    this.setTheme(this.selectedTheme);
    
    dashboardService.getMenuOptions()
      .subscribe((menuList: any) => {
        let menu: { [key: number]: any } = {};
        
        // Get the root level
        let rootElements: IRouteModel[] = menuList.filter((menuItem: any) => !menuItem.parentRouteId);
        rootElements.forEach(menuItem => {
          menu[menuItem.id] = {
            title: menuItem.routeName,
            icon: menuItem.description,
            link: menuItem.routeValue
          };
        });

        // Remove root level from source
        rootElements.forEach(elem => {
          let index: number = menuList.indexOf(elem, 0);
          menuList.splice(index, 1);
        });

        // Get first layer children
        let registeredChildrenElements: IRouteModel[] = [];
        for(let menuItem of menuList) {
          if(menuItem.parentRouteId && menu[menuItem.parentRouteId]) {
            if('children' in menu[menuItem.parentRouteId] == false) {
              menu[menuItem.parentRouteId].expanded = false,
              menu[menuItem.parentRouteId].children = [];
            }

            menu[menuItem.parentRouteId].children.push({
              title: menuItem.routeName,
              icon: menuItem.description,
              link: menuItem.routeValue,
              id: menuItem.id
            });

            registeredChildrenElements.push(menuItem);
          }
        }

        // Remove first layer children from source
        registeredChildrenElements.forEach(elem => {
          let index: number = menuList.indexOf(elem, 0);
          menuList.splice(index, 1);
        });
        
        let secondLayerData = [];
        for(let item in menu) {
          secondLayerData.push(menu[item]);
        }
        
        // Procesing third layer data
        secondLayerData.forEach(elem => {
          if(elem.children){
            elem.children.forEach((element: any) => {
              menuList.forEach((leftOverItem: any) => {
                if(leftOverItem.parentRouteId == element.id){
                  if('children' in element == false){
                    element.expanded = true;
                    element.children = [];
                  }
                  element.children.push({
                    title: leftOverItem.routeName,
                    icon: leftOverItem.description,
                    link: leftOverItem.routeValue
                  });
                }
              });

              if('id' in element){
                delete element['id'];
              }
            });
          }
        });

        this.menuOptions = secondLayerData;
        chageDetector.detectChanges();
      });

    this.isButtonVisible = false;
  }

  toggle(): void {
    // this.sidebarService.toggle(false, 'left');
    let tempSide = document.getElementById('SideBar');
    let appContainer = document.getElementsByTagName('nb-layout-column')[0];
    let sidebarElement: HTMLElement;
    if(tempSide == null)
      return;
    
    sidebarElement = tempSide;
    
    if(sidebarElement.classList.contains('expanded')){
      sidebarElement.classList.remove('expanded');
      sidebarElement.classList.add('collapsed');
      appContainer.classList.remove('overlay');
    } else {
      sidebarElement.classList.remove('collapsed');
      sidebarElement.classList.add('expanded');
      appContainer.classList.add('overlay');
    }
  }

  overlayClick(){
    let appContainer = document.getElementsByTagName('nb-layout-column')[0];
    if(appContainer.classList.contains('overlay'))
      this.toggle();
    return;
  }

  setTheme(theme: string): void {
    localStorage.setItem('theme', theme);

    if(theme == 'Midnight'){
      this.themeService.changeTheme('mid-night');
    }else if(theme == 'Evening'){
      this.themeService.changeTheme('Dark'.toLowerCase());
    } else if (theme == 'Aquamarine') {
      this.themeService.changeTheme('aqua-marine');
    }else {
      this.themeService.changeTheme(theme.toLowerCase());
    }
  }

  flipProfilePanelVisibility(): void { this.isButtonVisible = !this.isButtonVisible; }

  logout(): void {
    localStorage.removeItem('auth_app_token');
    window.location.reload();
  }
}
