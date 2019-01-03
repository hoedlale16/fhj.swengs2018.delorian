import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../api/Project';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';
import {ProjectTime} from '../../api/ProjectTime';

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
