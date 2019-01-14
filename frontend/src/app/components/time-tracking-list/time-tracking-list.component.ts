import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectTimesService} from '../../services/project-times.service';
import {ProjectTime} from '../../api/ProjectTime';
import {Project} from '../../api/Project';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../api/User';
import {PageChangedEvent} from 'ngx-bootstrap';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-time-tracking-list',
  templateUrl: './time-tracking-list.component.html',
  styleUrls: ['./time-tracking-list.component.scss']
})
export class TimeTrackingListComponent implements OnInit {

  @Input() trackingListHeader: string;
  @Input() alreadyTrackedTimes: Array<ProjectTime>;
  @Input() currentRouteLink: string;
  @Input() projects: Array<Project>;
  @Input() showActionButtons = false;
  @Input() showExportTimesButton = false;

  @Input() alreadyTrackedTimesPage: Array<ProjectTime>;
  @Input() timeTrackingPerPage: number;

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

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.alreadyTrackedTimesPage = this.alreadyTrackedTimes.slice(startItem, endItem);
  }

  generatePDF() {
    const doc = new jsPDF();
    doc.text('Tracking Times!', 10, 10);

    const data: Array<Array<string>> = [];
    this.alreadyTrackedTimes.forEach((pT: ProjectTime) => {
      const date = new Date(pT.trackingDate);
      data.push([date.toDateString(), pT.username, pT.workedHours + '' ]);
    });

    doc.autoTable({
      head: [['Date', 'User', 'Booked hours']],
      body: data
    });

    // Save report
    doc.save('report.pdf');
  }
}
