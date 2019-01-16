import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../api/Project';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


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
  @Input() totalBookedHours = 0;

  chartData: any[] = [];
  chartOptions: any;

  constructor(private projectService: ProjectService, private router: Router, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.prepareChart();
  }

  prepareChart() {
    const maxValueChart = this.project.totalPlannedHours > this.totalBookedHours ? this.project.totalPlannedHours : this.totalBookedHours;
    this.chartData = [
      {data: [this.project.totalPlannedHours], label: 'Planned Hours'},
      {data: [this.totalBookedHours], label: 'Worked Hours'} ];

    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            max: maxValueChart,
            min: 0,
            stepSize: maxValueChart / 10
          }
        }]
      }
    };
  }

  deactivateProject(project: Project) {

    this.projectService.delete(project)
      .subscribe(() => {
        this.router.navigate(['/project-management']);
        this.toastrService.info('Project deactivated');
      });
  }

}
