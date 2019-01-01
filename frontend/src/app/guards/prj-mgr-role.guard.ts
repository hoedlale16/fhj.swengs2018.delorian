import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PrjMgrRoleGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isLoggedIn) {
      // User not logged in, navigate to login page...
      this.router.navigate(['/login']);
      return false;
    }

    if (! this.authService.userRoles.includes('ROLE_PRJMGR')) {
      // We know that user is authenticated but has no ROLE_PRJMGR!
      this.router.navigate(['/dashboard']);
      return false;
    }

    // User is authenticated and has ROLE_PRJMGR
    return true;
  }
}
