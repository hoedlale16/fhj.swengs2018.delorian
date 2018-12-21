import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent implements OnInit {

  isLoggedIn: boolean;

  isLoggedInAndAdmin: boolean;
  isLoggedInAndPrjMgr: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.authService.loggedInChange.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.isLoggedInAndAdmin = this.isLoggedIn && this.authService.userRoles.includes('ROLE_ADMIN');
      this.isLoggedInAndPrjMgr = this.isLoggedIn && this.authService.userRoles.includes('ROLE_PRJMGR');
    });
  }

  logout() {
    this.authService.logout();
  }

}
