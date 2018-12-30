import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../api/User';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  users: Array<User>;
  navigationSubscription;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
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
    this.users = data.users.concat(this.userService.getOfflineUsers());
  }

  deleteUser(user: User) {

    this.userService.delete(user)
      .subscribe(() => {

        this.router.navigate(['/user-management']);
      });

  }
}
