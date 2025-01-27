import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarDoctorComponent } from './registrar-doctor.component';

describe('RegistrarDoctorComponent', () => {
  let component: RegistrarDoctorComponent;
  let fixture: ComponentFixture<RegistrarDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarDoctorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
