import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SopEditComponent } from './sop-edit.component';

describe('SopEditComponent', () => {
  let component: SopEditComponent;
  let fixture: ComponentFixture<SopEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
