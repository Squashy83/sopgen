import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopStepsComponent } from './sop-steps.component';

describe('SopStepsComponent', () => {
  let component: SopStepsComponent;
  let fixture: ComponentFixture<SopStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
