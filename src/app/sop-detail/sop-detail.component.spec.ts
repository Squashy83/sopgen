import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopDetailComponent } from './sop-detail.component';

describe('SopDetailComponent', () => {
  let component: SopDetailComponent;
  let fixture: ComponentFixture<SopDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
