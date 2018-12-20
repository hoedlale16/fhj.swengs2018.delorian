import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-return-to-dashboard',
  templateUrl: './return-to-dashboard.component.html',
  styleUrls: ['./return-to-dashboard.component.scss']
})
export class ReturnToDashboardComponent implements OnInit {


  isLoggedIn: boolean;

  constructor(private userService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn;
    this.userService.loggedInChange.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }


  returnToDashboard() {
    this.router.navigate(['dashboard' ]);
  }

}
