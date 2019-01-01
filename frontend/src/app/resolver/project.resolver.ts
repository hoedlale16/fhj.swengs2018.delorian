import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectService} from '../services/project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<Observable<Array<any>>> {

  constructor(private projectService: ProjectService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {

    const projectID = <number><any>route.paramMap.get('projectID');
    if (projectID) {
      return this.projectService.getProject(projectID);
    }
    return null;
  }

}
