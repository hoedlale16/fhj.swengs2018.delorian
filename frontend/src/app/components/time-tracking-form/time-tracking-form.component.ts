import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectTimesService} from '../../services/project-times.service';
import {ProjectTime} from '../../api/ProjectTime';
import {Project} from '../../api/Project';

@Component({
  selector: 'app-time-tracking-form',
  templateUrl: './time-tracking-form.component.html',
  styleUrls: ['./time-tracking-form.component.scss']
})
export class TimeTrackingFormComponent implements OnInit {

  @Input() currLoggedInUser: string;
  @Input() projectOptions;
  @Input() fillWithLastBooking = false;

  // Default value route to /time-tracking but might overwritten (e.g. for dashboard)
  @Input() currentRouteLink = '/time-tracking';

  timeTrackingForm: FormGroup;
  isEditMode = false;

  constructor(private projectTimesService: ProjectTimesService, private route: ActivatedRoute, private router: Router) {
    this.timeTrackingForm = new FormGroup({
      'id': new FormControl(),
      'username': new FormControl(),
      'projectID': new FormControl('', [Validators.required]),
      'trackingDate': new FormControl('',[Validators.required]),
      'workedHours': new FormControl('', [Validators.required, Validators.min(0.5), Validators.max(24)])
    });

    // Load all UserRoles for selection
    const data = this.route.snapshot.data;
    const timeTracking: ProjectTime = data.timeTracking;
    if (timeTracking) {
      this.isEditMode = true;
      this.timeTrackingForm.setValue(timeTracking);
      this.projectOptions = data.projectOptions;
      this.currLoggedInUser = timeTracking.username;
      this.timeTrackingForm.controls.trackingDate.setValue( new Date(timeTracking.trackingDate));

      this.handleNotChangeAbleForms(true);
    } else {
      this.isEditMode = false;
      this.timeTrackingForm.controls.username.disable();
    }


  }

  ngOnInit() {
    // Set last booking with current date if requested.
    if (this.fillWithLastBooking &&  this.getLastBooking()) {
      this.timeTrackingForm.setValue(this.getLastBooking());
    }
  }

  handleNotChangeAbleForms(disable: boolean) {
    if (disable) {
      this.timeTrackingForm.controls.username.disable();
      this.timeTrackingForm.controls.projectID.disable();
      this.timeTrackingForm.controls.trackingDate.disable();
    } else {
      this.timeTrackingForm.controls.username.enable();
      this.timeTrackingForm.controls.projectID.enable();
      this.timeTrackingForm.controls.trackingDate.enable();
    }
  }



  save() {
    // Just controls to get data for storage
    this.handleNotChangeAbleForms(false);
    const projectTime = this.timeTrackingForm.value;
    this.handleNotChangeAbleForms(true);

    // Set currentLogedInUser just to be sure that trackted time is assigned to logged in user...
    projectTime.username = this.currLoggedInUser;

    if (this.isEditMode) {
      this.projectTimesService.update(projectTime).subscribe((response: any) => {
        alert('Update successfully');
        this.navigateToLastRoute();
      });
    } else {
      this.projectTimesService.create(projectTime).subscribe((response: any) => {
        this.storeLastBooking(projectTime);

        alert('Time booked sucessfully');
        this.navigateToLastRoute();
      });
    }
  }

  navigateToLastRoute() {
    console.log('NavigabeToLastRoute: ' + this.currentRouteLink);
    this.router.navigate([this.currentRouteLink]);
  }

  storeLastBooking(projectTime: ProjectTime) {
    // Just keep all last bookings of all other users than current one
    let lastBookings = localStorage.getItem('lastBookings') ? <Array<ProjectTime>>JSON.parse(localStorage.getItem('lastBookings')) : [];
    lastBookings = lastBookings.filter( (pt) => {
      return pt.username !== projectTime.username;
    });
    lastBookings.push(projectTime);

    // Store data in localStorage for fast booking via dashboard
    localStorage.setItem('lastBookings', JSON.stringify(lastBookings));
  }

  getLastBooking(): ProjectTime {
    const lastBookings = localStorage.getItem('lastBookings') ? <Array<ProjectTime>>JSON.parse(localStorage.getItem('lastBookings')) : [];
    const lastBookingOfUserArray = lastBookings.filter((pt) => {
      return (pt.username === this.currLoggedInUser);
    });
    if (lastBookingOfUserArray.length >= 1) {
      const lastBookingOfUser: ProjectTime = lastBookingOfUserArray[0];
      lastBookingOfUser.trackingDate = new Date();
      return lastBookingOfUser;
    }
    return null;
  }

}
