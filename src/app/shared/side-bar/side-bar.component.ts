import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  menuItems = [
    { label: 'Dashboard', route: '/home', icon: 'nc-icon nc-bank' },
    {
      label: 'User Profile',
      route: '/DashBoardPages/UserProfile',
      icon: 'nc-icon nc-circle-10',
    },
    {
      label: 'Notifications',
      route: '/DashBoardPages/Notifi',
      icon: 'nc-icon nc-bell-55',
    },
    {
      label: 'Events',
      route: '/DashBoardPages/Events',
      icon: 'nc-icon nc-diamond',
    },
    { label: 'Maps', route: '/DashBoardPages/Map', icon: 'nc-icon nc-pin-3' },
    {
      label: 'Manage Users',
      route: '/DashBoardPages/Users',
      icon: 'nc-icon nc-badge',
    },
    {
      label: 'Feedback',
      route: '/DashBoardPages/Feedback',
      icon: 'nc-icon nc-caps-small',
    },
  ];

  currentRoute: string = '';

  constructor(private router: Router, private sessionManager: SessionService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  isNoneActive(): boolean {
    return !this.menuItems.some((item) => this.isActive(item.route));
  }
  logout() {
    this.sessionManager.removeToken();
    this.router.navigate(['/SecurityPages/SignIn']);
  }
}
