import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  isEditMode: boolean;
  currLoggedInUser: string;
  projectForm: FormGroup;

  constructor(private projectService: ProjectService, private authService: AuthService,
              private route: ActivatedRoute, private router: Router, private toastrService: ToastrService) {
    this.projectForm = new FormGroup({
      'id': new FormControl(),
      'topic': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      'projectManager': new FormControl('', [Validators.required]),
      'totalPlannedHours': new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]),
      // 'totalPlannedHours': new FormControl('', [Validators.required, Validators.pattern('^\d*\.\[0,5]{0,1}')]),
      'description': new FormControl(),
      'projectTimes': new FormControl()
    });

    // Set current logged in user as project manager and disable field (not changeable for user!)
    this.projectForm.controls.projectManager.disable();


    // Load preloaded data(edit Mode)
    const data = this.route.snapshot.data;
    const project = data.project;
    if (project) {
      this.isEditMode = true;
      this.projectForm.setValue(project);
    } else {
      this.isEditMode = false;
    }
  }

  ngOnInit() {
    this.currLoggedInUser = this.authService.currLoggedInUserName;
  }

  saveProject() {
    const project = this.projectForm.value;

    // project Manager is not changeable! this is the current logged. ignore any user input for that field.
    project.projectManager = this.currLoggedInUser;

    if (this.isEditMode) {
      this.projectService.update(project).subscribe((response: any) => {
        this.router.navigate(['/project-management']);
        if (response) {
          this.toastrService.success('Project update sucessfully');
        }
      });
    } else {
      this.projectService.create(project).subscribe((response: any) => {
        this.router.navigate(['/project-management']);
        if (response) {
          this.toastrService.success('Project created sucessfully');
        }
      });
    }
  }

}
