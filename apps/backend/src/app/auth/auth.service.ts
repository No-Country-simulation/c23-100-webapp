import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(): string {
    return 'Login endpoint';
  }

  signup(): string {
    return 'Signup endpoint';
  }
}
