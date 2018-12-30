import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserRoles} from '../../api/UserRoles';
import {UserService} from '../../services/user.service';

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

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.userForm = new FormGroup( {
      'username': new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      'password': new FormControl(),
      'firstName':  new FormControl('',[Validators.required, Validators.minLength(3)] ),
      'lastName': new FormControl([Validators.required, Validators.minLength(3)]),
      'eMail': new FormControl(),
      'userRoles': new FormControl(),
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
    }
  }

  ngOnInit() {
  }

  saveUser() {
    const user = this.userForm.value;
    if (this.isEditMode) {
      this.userService.update(user).subscribe((response: any) => {
        alert('User updated sucessfully');
        this.router.navigate(['/user-management']);
      });
    } else {
      this.userService.create(user).subscribe((response: any) => {
        alert('User created sucessfully');
        this.router.navigate(['/user-management']);
      });
    }
  }
}
