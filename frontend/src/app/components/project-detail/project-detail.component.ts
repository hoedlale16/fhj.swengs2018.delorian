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
  chartType = 'doughnut';

  projectTimes: Array<ProjectTime> = [];

  project: Project;


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
    this.project = data.project;

    this.projectTimes = data.projectTimes;
    if (this.projectTimes) {
      this.projectTimes.forEach((p) => {
        this.chartLabels.push(p.username);
        this.chartData.push(p.workedHours);

      });
    }
  }


}
