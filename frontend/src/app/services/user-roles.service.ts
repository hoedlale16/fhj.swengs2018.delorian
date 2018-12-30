import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  constructor(private http: HttpClient, private router: Router) { }

  getAll() {
    return this.http.get('/api/userroles/').pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
