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
import {UserFormComponent} from './components/user-form/user-form.component';
import {UserRolesResolver} from './resolver/user-roles.resolver';
import {UserResolver} from './resolver/user.resolver';

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
    runGuardsAndResolvers: 'always',
    resolve: {
       users: UserListResolver
     }
  },
  {
    path: 'user-form', component: UserFormComponent, canActivate: [AdminRoleGuardGuard],
    resolve: {
      usersRoles: UserRolesResolver
    }
  },
  {
    path: 'user-form/:username', component: UserFormComponent, canActivate: [AdminRoleGuardGuard],
    resolve: {
      user: UserResolver,
      usersRoles: UserRolesResolver
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
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
