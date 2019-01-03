import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../api/Project';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {

  @Input() project: Project;
  @Input() showFullDetails = false;

  @Input() buttonLink: string;
  @Input() buttonLinkName: string;

  @Input()
  totalBookedHours = 0;

  chartData: any[] = [];
  options: any;
  maxValueChart: any;

  chartColors: Array<any> = [
    {
      backgroundColor: ['#fe59c2', '#9559fe', '#c2fe59' , '#59fe95' , '#00ffff', '#FF0000']
    }];


  constructor(private projectService: ProjectService, private router: Router) {

  }


  ngOnInit() {

    this.maxValueChart = this.project.totalPlannedHours > this.totalBookedHours ? this.project.totalPlannedHours : this.totalBookedHours;

    this.chartData = [
      {data: [this.project.totalPlannedHours], label: 'Planned Hours'},
      {data: [this.totalBookedHours], label: 'Worked Hours'}
    ];
    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            max: this.maxValueChart,
            min: 0,
            stepSize: this.maxValueChart / 10
          }
        }]
      }
    };


  }


  deactivateProject(project: Project) {

    this.projectService.delete(project)
      .subscribe(() => {
        this.router.navigate(['/project-management']);
      });
  }

}
