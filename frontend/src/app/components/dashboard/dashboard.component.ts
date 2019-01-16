import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Project} from '../../api/Project';
import {ProjectTime} from '../../api/ProjectTime';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currLoggedInUser: string;
  hasUserRole: boolean;

  projects: Array<Project> = [];
  alreadyTrackedTimes: Array<ProjectTime> = [];

  // key: projectID, value: totalWorkedHoursOfProject
  projectTimesMap: Map<number, number> = new Map();

  // Chart variables
  chartLabels: string[] = [];
  chartData: any[] = [];
  chartOptions: any;
  chartColors: Array<any> = [{  backgroundColor: ['#fe59c2', '#9559fe', '#c2fe59', '#59fe95', '#00ffff', '#FF0000'] }];


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.loadData();

  }

  loadData() {
    this.currLoggedInUser = this.authService.currLoggedInUserName;
    this.hasUserRole = this.authService.isLoggedInAndHasUserRole('ROLE_USER');
    const data = this.route.snapshot.data;
    this.projects = data.projects ? data.projects : [];
    this.alreadyTrackedTimes = data.alreadyTrackedTimes ? data.alreadyTrackedTimes : [];
    this.prepareChartData();
  }

  prepareChartData() {
    this.buildProjectTimesMap();

    // Fill chart data
    const hours: number[] = [];
    this.projectTimesMap.forEach((prjTotalHour, projectID) => {
      this.chartLabels.push(this.getProjectTopicByID(projectID));
      hours.push(prjTotalHour);
    });

    if (hours.length > 0) {
      this.chartData = [{data: hours, label: 'Worked hours'}];
    } else {
      this.chartData = [];
    }

    // Design chart
    this.chartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

  }

  buildProjectTimesMap() {
    this.alreadyTrackedTimes.forEach((p) => {
      let currWorkedHours = p.workedHours;

      // Add already stored worked hours of user
      if (this.projectTimesMap.has(p.projectID)) {
        currWorkedHours += this.projectTimesMap.get(p.projectID);
      }
      this.projectTimesMap.set(p.projectID, currWorkedHours);
    });
  }

  getProjectTopicByID(projectID: number): string {
    let topic = '???';
    this.projects.forEach((p) => {
      if (p.id === projectID) {
        topic = p.topic;
        return;
      }
    });
    return topic;
  }
}

