import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectTime} from '../../api/ProjectTime';
import {Project} from '../../api/Project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  doughnutChartLabels: string[] = [];
  doughnutChartData: number[] = [];
  doughnutChartType: string = 'doughnut';

  projectTimes: Array<ProjectTime>;
  projects: Array<Project>;


  chartColors: Array<any> = [
    {
      backgroundColor: ['#fe59c2', '#9559fe', '#c2fe59' , '#59fe95' , '#00ffff']
    }];


  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  constructor(private route: ActivatedRoute) {
    this.loadData();
  }


  ngOnInit() {
  }

  loadData() {
    const data = this.route.snapshot.data;
    this.projects = [data.project];

    this.projectTimes = data.projectTimes;
    if (this.projectTimes) {
      this.projectTimes.forEach((p) => {
        this.doughnutChartLabels.push(p.username);
        this.doughnutChartData.push(p.workedHours);

      });
    }
  }


}
