import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarDoctorComponent } from './asignar-doctor.component';

describe('AsignarDoctorComponent', () => {
  let component: AsignarDoctorComponent;
  let fixture: ComponentFixture<AsignarDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarDoctorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
