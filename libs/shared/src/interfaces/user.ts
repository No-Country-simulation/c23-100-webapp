import { Role } from '../enums/user-role';

export interface User {
  name: string;
  email: string;
  role: Role;
  phone: string;
  specialization?: string;
}
