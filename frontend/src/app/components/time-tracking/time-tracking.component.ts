import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ProjectTime} from '../../api/ProjectTime';
import {Project} from '../../api/Project';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.scss']
})
export class TimeTrackingComponent implements OnInit, OnDestroy {

  navigationSubscription;

  currLoggedInUser: String;
  alreadyTrackedTimes: Array<ProjectTime>;
  projects: Array<Project>;


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.loadData();
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
    this.currLoggedInUser = this.authService.currLoggedInUserName;
    const data = this.route.snapshot.data;
    this.alreadyTrackedTimes = data.alreadyTrackedTimes;
    this.projects = data.projects;
  }

}
