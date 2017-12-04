import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopCreateComponent } from './sop-create.component';

describe('SopCreateComponent', () => {
  let component: SopCreateComponent;
  let fixture: ComponentFixture<SopCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
