import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectService} from '../services/project.service';
import {AuthService} from '../services/auth.service';
import {ProjectTimesService} from '../services/project-times.service';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingOfProjectResolver implements Resolve<Observable<Array<any>>> {

  constructor(private projectTimesService: ProjectTimesService, private router: Router) {
  }

  // https://stackoverflow.com/questions/50384242/resolver-with-parameter-on-resolve-method

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {

    const projcetID: number = route.data['projectID'];
    if (projcetID) {
      return this.projectTimesService.getProjectTimesForProject(projcetID);
    }
    return null;
  }

}
