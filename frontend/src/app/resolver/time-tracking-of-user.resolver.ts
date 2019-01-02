import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectService} from '../services/project.service';
import {AuthService} from '../services/auth.service';
import {ProjectTimesService} from '../services/project-times.service';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingOfUserResolver implements Resolve<Observable<Array<any>>> {

  constructor(private projectTimesService: ProjectTimesService, private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {

    const currLoggedInUser = this.authService.currLoggedInUserName;
    if (currLoggedInUser) {
      return this.projectTimesService.getProjectTimesForUser(currLoggedInUser);
    }
    return null;
  }

}
