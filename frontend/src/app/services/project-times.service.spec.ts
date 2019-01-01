import { TestBed } from '@angular/core/testing';

import { ProjectTimesService } from './project-times.service';

describe('ProjectTimesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectTimesService = TestBed.get(ProjectTimesService);
    expect(service).toBeTruthy();
  });
});
