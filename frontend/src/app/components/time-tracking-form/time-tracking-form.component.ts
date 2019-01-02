import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectTimesService} from '../../services/project-times.service';

@Component({
  selector: 'app-time-tracking-form',
  templateUrl: './time-tracking-form.component.html',
  styleUrls: ['./time-tracking-form.component.scss']
})
export class TimeTrackingFormComponent implements OnInit {

  @Input()
  currLoggedInUser: string;

  @Input()
  projectOptions;

  timeTrackingForm: FormGroup;

  constructor(private projectTimesService: ProjectTimesService, private router: Router) {
    this.timeTrackingForm = new FormGroup({
      'username': new FormControl(),
      'projectID': new FormControl('', [Validators.required]),
      'trackingDate': new FormControl('',[Validators.required]),
      'workedHours': new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)])
    });
  }

  ngOnInit() {}

  save() {
    // Just enable username control to get entered username
    const projectTime = this.timeTrackingForm.value;
    projectTime.username = this.currLoggedInUser;

    this.projectTimesService.create(projectTime).subscribe((response: any) => {
        alert('Time booked sucessfully');
        this.router.navigate(['/time-tracking']);
    });
  }

}
