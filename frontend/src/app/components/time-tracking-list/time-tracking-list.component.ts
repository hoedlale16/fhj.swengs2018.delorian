import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProjectTimesService} from '../../services/project-times.service';
import {ProjectTime} from '../../api/ProjectTime';
import {Project} from '../../api/Project';

@Component({
  selector: 'app-time-tracking-list',
  templateUrl: './time-tracking-list.component.html',
  styleUrls: ['./time-tracking-list.component.scss']
})
export class TimeTrackingListComponent implements OnInit  {
  isHidden = true;
  @Input() trackingListHeader: string;
  @Input() alreadyTrackedTimes: Array<ProjectTime>;
  @Input() projects: Array<Project>;

  constructor(private projectTimesService: ProjectTimesService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

  delete(trackedTime: ProjectTime) {
    this.projectTimesService.delete(trackedTime)
      .subscribe(() => {
        this.router.navigate(['/time-tracking']);
      });
  }

  getProjectTopic(projectID: number): string {
    const project: Project =  this.projects.filter((p: Project) => {
      return (p.id === projectID);
    })[0];

    if (project) {
      return project.topic;
    }
    return '???';
  }

  toggleContent() {
    this.isHidden ? this.isHidden = false : this.isHidden = true;
  }

}
