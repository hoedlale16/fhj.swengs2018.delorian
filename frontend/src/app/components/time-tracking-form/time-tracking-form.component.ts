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

  timeTrackingForm: FormGroup;

  constructor(private projectTimesService: ProjectTimesService, private router: Router) {
    this.timeTrackingForm = new FormGroup({
      'username': new FormControl(),
      'projectID': new FormControl('', [Validators.required]),
      'trackingDate': new FormControl('',[Validators.required]),
      'workedHours': new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)])
    });
  }

  ngOnInit() {
    // Set last booking with current date if requested.
    if (this.fillWithLastBooking &&  this.getLastBooking()) {
      this.timeTrackingForm.setValue(this.getLastBooking());
    }
  }

  save() {
    // Just enable username control to get entered username
    const projectTime = this.timeTrackingForm.value;
    projectTime.username = this.currLoggedInUser;

    this.projectTimesService.create(projectTime).subscribe((response: any) => {
        this.storeLastBooking(projectTime);

        alert('Time booked sucessfully');
        this.router.navigate(['/time-tracking']);

    });
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
