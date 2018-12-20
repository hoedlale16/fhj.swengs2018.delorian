import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currLoggedInUser: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currLoggedInUser = this.authService.currLoggedInUserName;
  }
}
