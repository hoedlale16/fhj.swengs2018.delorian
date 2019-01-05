import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent implements OnInit {

  isLoggedIn: boolean;

  // Role based handling
  isLoggedInAndUserRole: boolean;
  isLoggedInAndAdminRole: boolean;
  isLoggedInAndPrjMgrRole: boolean;

  constructor(private authService: AuthService) {
    // When refresh (F5) is done...
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isLoggedInAndUserRole = this.isLoggedIn && this.authService.userRoles.includes('ROLE_USER');
    this.isLoggedInAndAdminRole = this.isLoggedIn && this.authService.userRoles.includes('ROLE_ADMIN');
    this.isLoggedInAndPrjMgrRole = this.isLoggedIn && this.authService.userRoles.includes('ROLE_PRJMGR');
  }

  ngOnInit() {
    this.authService.loggedInChange.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.isLoggedInAndUserRole = this.isLoggedIn && this.authService.userRoles.includes('ROLE_USER');
      this.isLoggedInAndAdminRole = this.isLoggedIn && this.authService.userRoles.includes('ROLE_ADMIN');
      this.isLoggedInAndPrjMgrRole = this.isLoggedIn && this.authService.userRoles.includes('ROLE_PRJMGR');
    });
  }

  logout() {
    this.authService.logout();
  }

}
