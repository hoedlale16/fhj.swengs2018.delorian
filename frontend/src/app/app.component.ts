import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Delorean - Get your Time!';
  background: string;

  public constructor(private titleService: Title, private authService: AuthService) {
    this.setTitle(this.title);
    this.setBackground(authService.isLoggedIn);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


  ngOnInit() {
    this.authService.loggedInChange.subscribe((isLoggedIn) => {
      this.setBackground(isLoggedIn);
    });
    this.setTitle(this.title);
  }

  setBackground(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.background = 'bg-notag';
    } else {
      this.background = 'bg-tag';
    }
  }


}
