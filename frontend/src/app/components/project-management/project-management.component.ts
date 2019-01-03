import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../../api/Project';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit, OnDestroy {
  projects: Array<Project>;
  navigationSubscription;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // Show online and offline users
    this.loadData();

    // Reload route after deleting - Handled like descriped on webpage because variant of sesson didn't work
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
    this.projects = data.projects;
  }
}
