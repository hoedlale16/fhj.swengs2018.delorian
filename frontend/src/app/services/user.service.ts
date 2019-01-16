import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {User} from '../api/User';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {Alert, AlertType} from '../api/Alert';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  alert: Alert;

  constructor(private http: HttpClient, private router: Router) { }

  getAll() {
    return this.http.get('/api/users/').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getUser(username: string) {
    return this.http.get('/api/users/' + username).pipe(map((res: any) => {
      return res;
    }));
  }

  delete(user: User) {
    return this.http.delete('/api/users/' + user.username);
  }

  update(user: User) {
    return this.http.put('/api/users/' + user.username, user);
  }

  create(user: User) {
    return this.http.post('/api/users', user);
  }

  isUsernameTaken(username: string): Observable<any> {
    return this.http.get('/api/usernameTaken/' + username).pipe(map((res: any) => {
      return res;
    }));
  }
}
