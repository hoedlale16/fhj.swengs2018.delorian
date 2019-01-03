import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { TimeTrackingFormComponent } from './components/time-tracking-form/time-tracking-form.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { RatingModule } from 'ngx-bootstrap/rating';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppNavigationComponent } from './components/app-navigation/app-navigation.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { TimeTrackingListComponent } from './components/time-tracking-list/time-tracking-list.component';
import { TimeTrackingComponent } from './components/time-tracking/time-tracking.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import {ChartsModule} from 'ng2-charts';
import { AboutComponent } from './components/about/about.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppNavigationComponent,
    DashboardComponent,
    UserManagementComponent,
    UserFormComponent,
    ProjectManagementComponent,
    TimeTrackingFormComponent,
    ProjectFormComponent,
    TimeTrackingListComponent,
    TimeTrackingComponent,
    ProjectDetailsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    RatingModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxSelectModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
