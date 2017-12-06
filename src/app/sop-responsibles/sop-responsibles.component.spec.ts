import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopResponsiblesComponent } from './sop-responsibles.component';

describe('SopResponsiblesComponent', () => {
  let component: SopResponsiblesComponent;
  let fixture: ComponentFixture<SopResponsiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopResponsiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopResponsiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
