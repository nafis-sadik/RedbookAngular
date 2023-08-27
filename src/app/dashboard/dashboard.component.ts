import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { NbMenuItem, NbSidebarService, NbThemeService } from '@nebular/theme';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DashboardComponent {
  selectedTheme: string | undefined;
  isButtonVisible: boolean;
  themes: string[] = [
    'Default',
    'Dark',
    'Cosmic',
    'Corporate'
  ];

  menuOptions: NbMenuItem[];

  constructor(
    private dashboardService: DashboardService,
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private authService: NbAuthService
  ) {
    // If no theme has been cached, select default theme
    if (localStorage.getItem('theme') == null && this.themes.length > 0) {
      this.setTheme(this.themes[0]);
      this.selectedTheme = this.themes[0];
    } else {
      this.themes.forEach(themeName => {
        if (themeName == localStorage.getItem('theme'))
        {
          this.selectedTheme = themeName;
          this.setTheme(themeName);
        }
      });
    }

    this.menuOptions = dashboardService.getMenuOptionsByUserId("GUID");
    this.isButtonVisible = false;
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  setTheme(theme: string) {
    this.themeService.changeTheme(theme.toLowerCase());
    localStorage.setItem('theme', theme);
  }

  flipProfilePanelVisibility() :void{ this.isButtonVisible = !this.isButtonVisible; }

  logout(): void {
    localStorage.removeItem('auth_app_token');
    window.location.reload();
  }
}
