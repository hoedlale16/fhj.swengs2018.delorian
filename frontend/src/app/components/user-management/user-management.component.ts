import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../api/User';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {PageChangedEvent} from 'ngx-bootstrap';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  users: Array<User>;
  navigationSubscription;
  currLoggedInUser: string;

  usersPerPage = 6;
  usersPage: Array<User>;


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
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
    this.users = data.users ? data.users : [];
    this.currLoggedInUser = this.authService.currLoggedInUserName;
    this.usersPage = this.users.slice(0, this.usersPerPage);

  }

  deleteUser(user: User) {

    this.userService.delete(user)
      .subscribe(() => {

        this.router.navigate(['/user-management']);
      });

  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.usersPage = this.users.slice(startItem, endItem);
  }
}
