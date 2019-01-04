import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  userRoles: Array<string> = [];
  currLoggedInUserName: string;


  loggedInChange: Subject<boolean> = new Subject<boolean>();
  jwtHelperService: JwtHelperService;
  accessTokenLocalStorageKey = 'access_token';

  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelperService = new JwtHelperService();
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token && ! this.jwtHelperService.isTokenExpired(token)) {
      // Set login data parsed from JWT
      this.isLoggedIn = true;
      const decodedToken = this.jwtHelperService.decodeToken(token);
      this.currLoggedInUserName = decodedToken.sub;
      this.userRoles = decodedToken.authorities;

      console.log('Auth-Data: '
        + this.isLoggedIn + '/' + this.currLoggedInUserName + '/' + this.userRoles);
    }

    this.loggedInChange.subscribe((value) => {
      this.isLoggedIn = value;

      // Reset Data if user logged out
      if (this.isLoggedIn === false) {
        this.currLoggedInUserName = '';
        this.userRoles = [];
      }
    });
  }

  login(user) {
    return this.http.post('/api/auth/', user, {
      'headers': new HttpHeaders({'Content-Type': 'application/json'}),
      'responseType': 'text',
      observe: 'response'
    }).pipe(map((res: any) => {
      // Set JWT Token
      const token = res.headers.get('Authorization').replace(/^Bearer /, '');
      localStorage.setItem(this.accessTokenLocalStorageKey, token);

      // Set login data parsed from JWT
      const decodedToken = this.jwtHelperService.decodeToken(token);
      this.currLoggedInUserName = decodedToken.sub;
      this.userRoles = decodedToken.authorities;


      // Trigger that login was done and navigate to dashboard
      this.loggedInChange.next(true);
      this.router.navigate(['/dashboard']);
      return res;
    }));
  }

  logout() {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.loggedInChange.next(false);
    this.router.navigate(['/login']);
  }


}
