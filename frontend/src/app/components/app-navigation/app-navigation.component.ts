import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent implements OnInit {
  username: string;
  isLoggedIn: boolean;

  // Role based handling
  isLoggedInAndUserRole: boolean;
  isLoggedInAndAdminRole: boolean;
  isLoggedInAndPrjMgrRole: boolean;

  constructor(private authService: AuthService) {
    // When refresh (F5) is done...
    this.loadData();
  }

  ngOnInit() {
    this.authService.loggedInChange.subscribe((isLoggedIn) => {
      this.loadData();
    });
  }

  private loadData() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isLoggedInAndUserRole = this.authService.isLoggedInAndHasUserRole('ROLE_USER');
    this.isLoggedInAndAdminRole = this.authService.isLoggedInAndHasUserRole('ROLE_ADMIN');
    this.isLoggedInAndPrjMgrRole = this.authService.isLoggedInAndHasUserRole('ROLE_PRJMGR');
    this.username = this.authService.currLoggedInUserName;
  }

  logout() {
    this.authService.logout();
  }
}
