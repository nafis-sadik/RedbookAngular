import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DashboardComponent {
  selectedTheme: string | undefined;
  themes: string[] = [
    'Default',
    'Dark',
    'Cosmic',
    'Corporate'
  ];

  menuOptions: NbMenuItem[] = [
    {
      title: 'Dashboards',
      icon: 'keypad',
      link: '/dashboard/home'
    },
    {
      title: 'Product Management',
      icon: 'layers',
      expanded: false,
      children:[
        {
          title: 'Category Management',
          icon: 'list',
          link: '/dashboard/category'
        },
        {
          title: 'Product List',
          icon: 'list',
          link: '/dashboard/products'
        },
        {
          title: 'Invoice/Purchase',
          icon: 'shopping-bag',
          link: '/dashboard/purchase'
        },
        {
          title: 'Sell',
          icon: 'shopping-cart',
          link: '/dashboard/sell'
        }
      ]
    },
    {
      title: 'CRM',
      icon: 'people',
      expanded: false,
      children: [
        {
          title: 'Messenger',
          icon: 'message-circle'
        },
        {
          title: 'Whatsapp',
          icon: 'email'
        },
        {
          title: 'Customers',
          icon: 'person'
        }
      ]
    },
    {
      title: 'Settings',
      icon: 'settings',
      expanded: false,
      children: [
        {
          title: 'User Management',
          icon: 'person'
        },
        {
          title: 'Business Management',
          icon: 'briefcase'
        }
      ]
    }
  ];

  constructor(private sidebarService: NbSidebarService, private themeService: NbThemeService) {
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
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  setTheme(theme: string) {
    this.themeService.changeTheme(theme.toLowerCase());
    localStorage.setItem('theme', theme);
  }
}
