import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProjectTime} from '../../api/ProjectTime';
import {Project} from '../../api/Project';
import {FormControl, FormGroup} from '@angular/forms';
import {Media} from '../../api/Media';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  navigationSubscription;
  chartLabels: string[];
  chartData: number[];
  chartColors = [{backgroundColor: ['#fe59c2', '#9559fe', '#c2fe59', '#59fe95', '#00ffff', '#FF0000']}];

  projectTimes: Array<ProjectTime> = [];
  alreadyTrackedTimesPage: Array<ProjectTime>;
  timeTrackingPerPage = 3;

  projectMediaForm: FormGroup;
  projectMedia;

  totalBookedHours = 0;
  project: Project;
  currentRouteLink: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.loadData();
    this.projectMediaForm = new FormGroup({
      'files': new FormControl([])
    });


  }

  ngOnInit() {
    // Reload route after deleting - Handled like described on webpage because variant of sesson didn't work
    // Source: https://medium.com/engineering-on-the-incline/reloading-current-route-on-click-angular-5-1a1bfc740ab2
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.loadData();
      }
    });
  }

  ngOnDestroy() {
    // source: https://medium.com/engineering-on-the-incline/reloading-current-route-on-click-angular-5-1a1bfc740ab2
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  loadData() {
    const data = this.route.snapshot.data;
    this.project = data.project;
    this.projectTimes = data.projectTimes ? data.projectTimes : [];
    this.alreadyTrackedTimesPage = this.projectTimes.slice(0, this.timeTrackingPerPage);
    this.projectMedia = this.project.mediaMap;

    this.prepareChartData();
    this.projectTimes.forEach((p) => {
      this.totalBookedHours += p.workedHours;
    });
    this.currentRouteLink = '/project-details/' + this.project.id;

  }

  prepareChartData() {
    // Clear possible old data:
    this.chartLabels = [];
    this.chartData = [];

    // Generate Data
    const projectTimesMap = this.getSummarizedProjektTimes();

    // Fill chart data
    projectTimesMap.forEach((hours, user) => {
      this.chartLabels.push(user);
      this.chartData.push(hours);
    });
  }

  getSummarizedProjektTimes(): Map<string, number> {
    const projectTimesMap: Map<string, number> = new Map();
    this.projectTimes.forEach((p) => {
      let currWorkedHours = p.workedHours;

      // Add already stored worked hours of user
      if (projectTimesMap.has(p.username)) {
        currWorkedHours += projectTimesMap.get(p.username);
      }
      projectTimesMap.set(p.username, currWorkedHours);
    });

    return projectTimesMap;
  }
}
