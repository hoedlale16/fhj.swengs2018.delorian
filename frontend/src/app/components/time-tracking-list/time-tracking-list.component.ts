import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectTimesService} from '../../services/project-times.service';
import {ProjectTime} from '../../api/ProjectTime';
import {Project} from '../../api/Project';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-time-tracking-list',
  templateUrl: './time-tracking-list.component.html',
  styleUrls: ['./time-tracking-list.component.scss']
})
export class TimeTrackingListComponent implements OnInit {

  navigationSubscription;
  @Input() trackingListHeader: string;
  @Input() alreadyTrackedTimes: Array<ProjectTime>;
  @Input() currentRouteLink: string;
  @Input() projects: Array<Project>;
  @Input() showActionButtons = false;

  filterTimeTrackingForm: FormGroup;

  constructor(private projectTimesService: ProjectTimesService, private route: ActivatedRoute, private router: Router) {

    this.filterTimeTrackingForm = new FormGroup({
      'filterDate': new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() { }

  delete(trackedTime: ProjectTime) {
    this.projectTimesService.delete(trackedTime)
      .subscribe(() => {
        this.router.navigate([this.currentRouteLink]);
      });
  }

  getProjectTopic(projectID: number): string {
    const project: Project = this.projects.filter((p: Project) => {
      return (p.id === projectID);
    })[0];

    if (project) {
      return project.topic;
    }
    return '???';
  }

  filterTrackedTimes() {
    if (this.filterTimeTrackingForm.valid ) {
      const filterValue = this.filterTimeTrackingForm.value.filterDate;
      // Just compare Date not the time...
      const filterDate: Date = new Date(filterValue);
      filterDate.setHours(0, 0, 0, 0);

      this.alreadyTrackedTimes = this.alreadyTrackedTimes.filter((att: ProjectTime) => {
        const tDate: Date = new Date(att.trackingDate);
        tDate.setHours(0, 0, 0, 0);
        return (tDate.getTime() === filterDate.getTime());
      });
    }
  }

  resetFilter() {
    this.filterTimeTrackingForm.controls.filterDate.reset();
    console.log('time-tracking-list.component: currentRouteLink: ' + this.currentRouteLink);
    this.router.navigate([this.currentRouteLink]);
  }
}
