export interface SendDoctorNotificationOptions {
  patient: {
    name: string;
  };
  doctor: {
    name: string;
    email: string;
  };
  date: string;
  hour: string;
  reason: string;
}
