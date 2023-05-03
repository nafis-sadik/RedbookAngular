import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
  
export class DashboardComponent {
  selectedTheme;
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
      expanded: true,
      children: [
        {
          title: 'Krishi Ghor',
          icon: 'home',
          link: '/dashboard/home'
        },
        {
          title: 'FM SkyVision',
          icon: 'home',
          link: '/dashboard/home'
        }
      ],
    },
    {
      title: 'Product Management',
      icon: 'briefcase',
      link: '/dashboard/products'
    },
    {
      title: 'Category Management',
      icon: 'layers',
      link: '/dashboard/category'
    },
    {
      title: 'Inventory Management',
      icon: 'trending-up',
      expanded: false,
      children: [
        {
          title: 'Purchase',
          icon: 'shopping-bag'
        },
        {
          title: 'Sell',
          icon: 'shopping-cart'
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
