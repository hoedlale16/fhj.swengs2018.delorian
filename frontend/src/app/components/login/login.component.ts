import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup( {
      'username': new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      'password': new FormControl('',[Validators.required, Validators.minLength(1)] )
    });
  }

  login() {

    const user = this.loginForm.value;

    this.authService.login(user)
      .subscribe((res: any) => {
      }, (error) => {
        this.playAudio();
        // this.alarm();
      });
  }
  playAudio() {
    const audio = new Audio();
    audio.src = '../../../assets/sounds/crash.mp3';
    audio.load();
    audio.play();
  }
  alarm() {
    alert('wrong username or password');
  }
}
