import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserRolesService} from '../services/user-roles.service';

@Injectable({
  providedIn: 'root'
})
export class UserRolesResolver implements Resolve<Observable<Array<any>>> {

  constructor(private userRoleService: UserRolesService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    return this.userRoleService.getAll();
  }

}
