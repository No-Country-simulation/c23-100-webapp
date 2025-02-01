import { Role } from '../enums/user-role';

export interface User {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone: string;
  specialization?: string;
}
