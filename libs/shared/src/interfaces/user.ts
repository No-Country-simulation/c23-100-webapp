import { Role } from '../dtos/auth.dto';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  phone: string;
  specialization?: string;
}
