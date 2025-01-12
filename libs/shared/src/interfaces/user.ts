import { Role } from '../dtos/create-user.dto';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  specialization?: string;
}
