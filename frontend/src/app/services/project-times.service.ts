import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Project} from '../api/Project';
import {ProjectTime} from '../api/ProjectTime';

@Injectable({
  providedIn: 'root'
})
export class ProjectTimesService {

  constructor(private http: HttpClient, private router: Router) { }

  getProjectTimesForProject(projectID: number) {
    return this.http.get('/api/projectTimes?projectID=' + projectID).pipe(
      map((response: any) => {
        response.trackingDate = new Date(response.trackingDate);
        return response;
      })
    );
  }

  getProjectTimesForUser(username: string) {
    return this.http.get('/api/projectTimes?username=' + username).pipe(
      map((response: any) => {
        if (response != null) {
          response.trackingDate = new Date(response.trackingDate);
        }
        return response;
      })
    );
  }

  getProjectTime(projectTimeID: number) {
    return this.http.get('/api/projectTimes/' + projectTimeID).pipe(map((res: any) => {
      res.trackingDate = new Date(res.trackingDate);
      return res;
    }));
  }

  create(projectTime: ProjectTime) {
    return this.http.post('/api/projectTimes', projectTime);
  }

  update(projectTime: ProjectTime) {
    return this.http.put('/api/projectTimes/' + projectTime.id, projectTime);
  }

  delete(projectTimes: ProjectTime) {
    return this.http.delete('/api/projectTimes/' + projectTimes.id);
  }
}
