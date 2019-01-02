import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackingListComponent } from './time-tracking-list.component';

describe('TimeTrackingListComponent', () => {
  let component: TimeTrackingListComponent;
  let fixture: ComponentFixture<TimeTrackingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrackingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrackingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
