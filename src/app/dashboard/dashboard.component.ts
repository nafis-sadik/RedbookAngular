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
      expanded: true,
      children: [
        {
          title: 'Krishi Ghor',
          icon: 'home-outline',
          link: '/dashboard/home'
        },
        {
          title: 'FM SkyVision',
          icon: 'home-outline',
          link: '/dashboard/home'
        }
      ],
    },
    {
      title: 'Product Management',
      expanded: false,
      children: [
        {
          title: 'Add Product',
          icon: 'file-add'
        },
        {
          title: 'Update Product',
          icon: 'file'
        },
        {
          title: 'Product List',
          icon: 'list'
        }
      ]
    },
    {
      title: 'Inventory Management',
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
      title: 'Catagory Management',
      expanded: false,
      children: [
        {
          title: 'Add Catagory',
          icon: 'folder-add'
        },
        {
          title: 'Update Catagory',
          icon: 'folder'
        },
        {
          title: 'Catagory List',
          icon: 'list'
        }
      ]
    },
    {
      title: 'CRM',
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
