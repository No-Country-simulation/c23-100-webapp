import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from '@org/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return loginDto;
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return signupDto;
  }
}
