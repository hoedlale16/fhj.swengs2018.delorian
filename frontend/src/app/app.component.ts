import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Delorian - Track your time!';
  background = 'bg-tag';

  public constructor(private titleService: Title, private authService: AuthService) {
    this.setTitle(this.title);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


  ngOnInit() {
    this.authService.loggedInChange.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.background = 'bg-notag';
      } else {
        this.background = 'bg-tag';
      }
    });
  }


}
