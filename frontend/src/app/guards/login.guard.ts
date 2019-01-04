import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // User is logged in, but want to login page - redirekt to dashboard
    if (this.authService.isLoggedIn) {
      // Other option is, logout of user and go to login page...
      // this.authService.logout();

      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
