import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ProjectManagementComponent} from './components/project-management/project-management.component';
import {AuthGuard} from './guards/auth.guard';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UserListResolver} from './resolver/user-list.resolver';
import {AdminRoleGuard} from './guards/admin-role.guard';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {TimeTrackingComponent} from './components/time-tracking/time-tracking.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {UserRolesResolver} from './resolver/user-roles.resolver';
import {UserResolver} from './resolver/user.resolver';
import {PrjMgrRoleGuard} from './guards/prj-mgr-role.guard';
import {ProjectListResolver} from './resolver/project-list.resolver';
import {ProjectResolver} from './resolver/project.resolver';
import {ProjectFormComponent} from './components/project-form/project-form.component';

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
    path: 'user-management', component: UserManagementComponent, canActivate: [AdminRoleGuard],
    runGuardsAndResolvers: 'always',
    resolve: {
       users: UserListResolver
     }
  },
  {
    path: 'user-form', component: UserFormComponent, canActivate: [AdminRoleGuard],
    resolve: {
      usersRoles: UserRolesResolver
    }
  },
  {
    path: 'user-form/:username', component: UserFormComponent, canActivate: [AdminRoleGuard],
    resolve: {
      user: UserResolver,
      usersRoles: UserRolesResolver
    }
  },
  {
    path: 'project-management', component: ProjectManagementComponent, canActivate: [PrjMgrRoleGuard],
    runGuardsAndResolvers: 'always',
    resolve: {
      projects: ProjectListResolver
    }
  },
  {
    path: 'project-form', component: ProjectFormComponent, canActivate: [PrjMgrRoleGuard],
  },
  {
    // TODO Guard der ueberprueft ob eingeloggter User auch ProjectManager von georderten PRojekt ist.
    path: 'project-form/:projectID', component: ProjectFormComponent, canActivate: [PrjMgrRoleGuard],
    resolve: {
      project: ProjectResolver,
    }
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
