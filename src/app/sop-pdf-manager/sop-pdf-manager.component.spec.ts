import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopPdfManagerComponent } from './sop-pdf-manager.component';

describe('SopPdfManagerComponent', () => {
  let component: SopPdfManagerComponent;
  let fixture: ComponentFixture<SopPdfManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopPdfManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopPdfManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
