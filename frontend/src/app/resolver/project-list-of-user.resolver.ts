import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectService} from '../services/project.service';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectListOfUserResolver implements Resolve<Observable<Array<any>>> {

  constructor(private projectService: ProjectService, private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    const projectManager = this.authService.currLoggedInUserName;
    if (projectManager) {
      return this.projectService.getAllProjectsForUser(projectManager);
    }
    return null;
  }

}
