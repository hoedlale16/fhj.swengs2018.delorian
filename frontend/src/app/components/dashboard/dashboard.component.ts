import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../api/User';
import {Project} from '../../api/Project';
import {UserService} from '../../services/user.service';
import {ProjectService} from '../../services/project.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currLoggedInUser: string;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute) {
    const data = this.route.snapshot.data;
    const user = data.user;
    if (user) {
      console.log('User: ' + user.username);
    } else {
      console.log('no user');
    }
  }

  ngOnInit() {
    this.currLoggedInUser = this.authService.currLoggedInUserName;
  }

}

