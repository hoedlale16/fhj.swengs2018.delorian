import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { TimeTrackingComponent } from './components/time-tracking/time-tracking.component';
import { ReturnToDashboardComponent } from './components/return-to-dashboard/return-to-dashboard.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    UserManagementComponent,
    ProjectManagementComponent,
    UserFormComponent,
    TimeTrackingComponent,
    ReturnToDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }