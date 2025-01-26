import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitaAdminComponent } from './cita-admin.component';

describe('CitaAdminComponent', () => {
  let component: CitaAdminComponent;
  let fixture: ComponentFixture<CitaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
