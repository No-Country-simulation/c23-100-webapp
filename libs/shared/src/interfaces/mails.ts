export interface SendAppointmentConfirmationOptions {
  patient: {
    email: string;
    name: string;
  };
  doctor: {
    name: string;
  };
  date: string;
  hour: string;
  org: {
    phone: string;
  };
}
