import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRoles} from '../../api/UserRoles';
import {UserService} from '../../services/user.service';
import {existingUsernameValidator} from '../../validators/customValidators';
import {ToastrService} from 'ngx-toastr';
import {UserManagementComponent} from '../user-management/user-management.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  isEditMode: boolean;
  userForm: FormGroup;

  userRoleOptions:  Array<UserRoles>;
  projectOptions;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
              private toastrService: ToastrService) {
    this.userForm = new FormGroup( {
      'username': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)],
        [existingUsernameValidator(this.userService)]),
      'password': new FormControl(),
      'firstName':  new FormControl( '', [Validators.required, Validators.minLength(3)] ),
      'lastName': new FormControl('',  [Validators.required, Validators.minLength(3)]),
      'eMail': new FormControl('', [Validators.email]),
      'userRoles': new FormControl('', [Validators.required]),
      'managedProjects': new FormControl(),
      'projectTimes': new FormControl()
    });

    // Load all UserRoles for selection
    const data = this.route.snapshot.data;
    this.userRoleOptions = data.usersRoles;
    // this.projectOptions = data.projects;

    const user = data.user;
    if (user) {
      this.isEditMode = true;
      this.userForm.setValue(user);
      this.userForm.controls.username.disable();

    } else {
      this.isEditMode = false;
      this.userForm.controls.password.setValidators([Validators.required]);
    }
  }

  ngOnInit() {
  }

  saveUser() {
    // Just enable username control to get entered username
    this.userForm.controls.username.enable();
    const user = this.userForm.value;
    this.userForm.controls.username.disable();

    if (this.isEditMode) {
      this.userService.update(user).subscribe((response: any) => {
        this.router.navigate(['/user-management']);
        if (response) {
          this.toastrService.info('Update sucessfully');
        }
      });
    } else {
      this.userService.create(user).subscribe((response: any) => {
        this.router.navigate(['/user-management']);
        if (response) {
          this.toastrService.success('Created sucessfully');
        }
      });
    }
  }
}
