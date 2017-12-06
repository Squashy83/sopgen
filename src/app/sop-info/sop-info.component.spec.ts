import { SopInfoComponent } from './sop-info.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('SopCreateComponent', () => {
  let component: SopInfoComponent;
  let fixture: ComponentFixture<SopInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SopInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
