import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToDashboardComponent } from './return-to-dashboard.component';

describe('ReturnToDashboardComponent', () => {
  let component: ReturnToDashboardComponent;
  let fixture: ComponentFixture<ReturnToDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnToDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
