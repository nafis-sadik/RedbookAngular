import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbThemeService } from '@nebular/theme';
import { DashboardService } from './services/dashboard.service';

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

    this.menuOptions = dashboardService.getMenuOptionsByUserId("GUID");
    this.isButtonVisible = false;
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  setTheme(theme: string) {
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

  flipProfilePanelVisibility() :void{ this.isButtonVisible = !this.isButtonVisible; }

  logout(): void {
    localStorage.removeItem('auth_app_token');
    window.location.reload();
  }
}
