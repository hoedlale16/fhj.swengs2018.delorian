import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {User} from '../api/User';
import {Project} from '../api/Project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllProjects() {
    return this.http.get('/api/projects/').pipe(map((res: any) => {
      return res;
    }));
  }

  getAllProjectsForUser(projectManager: string) {
    // return this.http.get('/api/projectsPrjMgr/' + projectManager).pipe(
    return this.http.get('/api/projects?projectManager=' + projectManager).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getProject(projectID: number) {
    return this.http.get('/api/projects/' + projectID).pipe(map((res: any) => {
      return res;
    }));
  }

  delete(project: Project) {
    return this.http.delete('/api/projects/' + project.id);
  }

  update(project: Project) {
    return this.http.put('/api/projects/' + project.id, project);
  }

  create(project: Project) {
    return this.http.post('/api/projects', project);
  }
}
