import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectTime} from '../../api/ProjectTime';
import {Project} from '../../api/Project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  chartLabels: string[] = [];
  chartData: number[] = [];

  projectTimes: Array<ProjectTime> = [];
  projectTimesMap: Map<string, number> = new Map();
  totalBookedHours = 0;

  project: Project;


  chartColors: Array<any> = [
    {
      backgroundColor: ['#fe59c2', '#9559fe', '#c2fe59', '#59fe95', '#00ffff']
    }];
  public chartHovered(e: any): void {
    console.log(e);
  }


  constructor(private route: ActivatedRoute) {
    const data = this.route.snapshot.data;
    this.project = data.project;

    this.projectTimes = data.projectTimes;
    this.prepareChartData();

    this.projectTimes.forEach((p) => {
      this.totalBookedHours += p.workedHours;
    });
  }

  ngOnInit() {
  }

  prepareChartData() {
    this.projectTimes.forEach((p) => {
      let currWorkedHours = p.workedHours;

      // Add already stored worked hours of user
      if (this.projectTimesMap.has(p.username)) {
        currWorkedHours += this.projectTimesMap.get(p.username);
      }
      this.projectTimesMap.set(p.username, currWorkedHours);
    });

    // Fill chart data
    this.projectTimesMap.forEach((hours, user) => {
      this.chartLabels.push(user);
      this.chartData.push(hours);
    });
  }
}
