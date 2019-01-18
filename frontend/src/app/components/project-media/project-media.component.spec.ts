import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMediaComponent } from './project-media.component';

describe('ProjectMediaComponent', () => {
  let component: ProjectMediaComponent;
  let fixture: ComponentFixture<ProjectMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
