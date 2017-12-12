import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopGeneratepdfComponent } from './sop-generatepdf.component';

describe('SopGeneratepdfComponent', () => {
  let component: SopGeneratepdfComponent;
  let fixture: ComponentFixture<SopGeneratepdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopGeneratepdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopGeneratepdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
