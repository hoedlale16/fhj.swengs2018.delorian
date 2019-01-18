import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediainputComponent } from './mediainput.component';

describe('MediainputComponent', () => {
  let component: MediainputComponent;
  let fixture: ComponentFixture<MediainputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediainputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediainputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
