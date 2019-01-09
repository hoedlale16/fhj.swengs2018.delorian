import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ProjectTimesService} from '../services/project-times.service';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingResolver implements Resolve<Observable<Array<any>>> {

  constructor(private projectTimesService: ProjectTimesService, private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {

    const timeTrackingID = <number><any>route.paramMap.get('timeTrackingID');
    if (timeTrackingID) {
      return this.projectTimesService.getProjectTime(timeTrackingID);
    }
    return null;
  }

}
