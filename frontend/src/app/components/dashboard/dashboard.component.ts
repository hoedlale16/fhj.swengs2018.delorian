import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Project} from '../../api/Project';
import {ProjectTime} from '../../api/ProjectTime';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currLoggedInUser: string;
  projects: Array<Project>;
  alreadyTrackedTimes: Array<ProjectTime>;
  isBookedProjectTimesHidden = true;

  // key: projectID, value: totalWorkedHoursOfProject
  projectTimesMap: Map<number, number> = new Map();

  // Chart variables
  chartLabels: string[] = [];
  chartData: any[] = [];
  chartOptions: any;
  chartColors: Array<any> = [{  backgroundColor: ['#fe59c2', '#9559fe', '#c2fe59', '#59fe95', '#00ffff', '#FF0000'] }];


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loadData();

  }

  loadData() {
    this.currLoggedInUser = this.authService.currLoggedInUserName;
    const data = this.route.snapshot.data;
    this.projects = data.projects;
    this.alreadyTrackedTimes = data.alreadyTrackedTimes;
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

    this.chartData = [{data: hours, label: 'Worked hours'}
    ];

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

  toggleBookedProjectTimes() {
    this.isBookedProjectTimesHidden ? this.isBookedProjectTimesHidden = false : this.isBookedProjectTimesHidden = true;
  }


}

