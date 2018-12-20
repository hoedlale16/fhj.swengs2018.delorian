import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ProjectManagementComponent} from './components/project-management/project-management.component';
import {AuthGuard} from './guards/auth.guard';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UserListResolver} from './resolver/user-list.resolver';
import {AdminRoleGuardGuard} from './guards/admin-role-guard.guard';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {TimeTrackingComponent} from './components/time-tracking/time-tracking.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard],
  },
  {
    path: 'user-management', component: UserManagementComponent, canActivate: [AdminRoleGuardGuard],
     resolve: {
       users: UserListResolver
     }
  },
  {
    path: 'project-management', component: ProjectManagementComponent, canActivate: [AuthGuard],
  },
  {
    path: 'time-tracking', component: TimeTrackingComponent, canActivate: [AuthGuard],
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
