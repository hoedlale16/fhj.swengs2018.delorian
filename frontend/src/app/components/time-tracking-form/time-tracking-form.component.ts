import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectTimesService} from '../../services/project-times.service';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking-form.component.html',
  styleUrls: ['./time-tracking-form.component.scss']
})
export class TimeTrackingFormComponent implements OnInit {

  currLoggedInUser: string;
  timeTrackingForm: FormGroup;
  projectOptions;

  constructor(private projectTimesService: ProjectTimesService, private authService: AuthService,
              private route: ActivatedRoute, private router: Router) {
    this.timeTrackingForm = new FormGroup({
      'username': new FormControl(),
      'projectID': new FormControl(),
      'trackingDate': new FormControl(),
      'workedHours': new FormControl()
    });

    // Set preloaded data (projects for selection list)
    const data = this.route.snapshot.data;
    this.projectOptions = data.projects;
  }

  ngOnInit() {
    this.currLoggedInUser = this.authService.currLoggedInUserName;
  }

  save() {
    // Just enable username control to get entered username
    const projectTime = this.timeTrackingForm.value;
    projectTime.username = this.currLoggedInUser;

    this.projectTimesService.create(projectTime).subscribe((response: any) => {
        alert('Time booked sucessfully');
        this.router.navigate(['/dashboard']);
    });
  }

}
