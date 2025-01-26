import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitaDoctorComponent } from './cita-doctor.component';

describe('CitaDoctorComponent', () => {
  let component: CitaDoctorComponent;
  let fixture: ComponentFixture<CitaDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaDoctorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitaDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
