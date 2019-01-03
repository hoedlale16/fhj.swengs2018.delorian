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

  @Input() showButtonCreate = true;
  @Input() showButtonEdit = true;
  @Input() showButtonDetails = true;


  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
  }


  deactivateProject(project: Project) {

    this.projectService.delete(project)
      .subscribe(() => {
        this.router.navigate(['/project-management']);
      });
  }

}
