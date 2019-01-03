import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../api/Project';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';
import {toInt} from 'ngx-bootstrap/chronos/utils/type-checks';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

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
  options = {
    scales: {
      yAxes: [{
        ticks: {
          max: 100,
          min: 0,
          stepSize: 10
        }
      }]
    }
  };

  constructor(private projectService: ProjectService, private router: Router) {
  }


  ngOnInit() {
    this.chartData = [
      {data: [this.project.totalPlannedHours], label: 'Planned Hours'},
      {data: [this.totalBookedHours], label: 'Worked Hours'}
    ];


  }


  deactivateProject(project: Project) {

    this.projectService.delete(project)
      .subscribe(() => {
        this.router.navigate(['/project-management']);
      });
  }

}
