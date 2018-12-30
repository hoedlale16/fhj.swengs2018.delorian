import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {UserRolesService} from '../services/user-roles.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Observable<Array<any>>> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
    const username = <string><any>route.paramMap.get('username');
    if (username) {
      return this.userService.getUser(username);
    }
    return null;
  }

}
