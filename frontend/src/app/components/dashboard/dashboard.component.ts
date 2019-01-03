import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Project} from '../../api/Project';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currLoggedInUser: string;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


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

