import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbThemeService } from '@nebular/theme';
import { DashboardService } from './services/dashboard.service';
import { IRouteModel } from './Models/IRouteModel';

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
    
    dashboardService.getMenuOptionsByUserId()
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
      });

      this.isButtonVisible = false;
    }

  toggle(): void { this.sidebarService.toggle(false, 'left'); }

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
