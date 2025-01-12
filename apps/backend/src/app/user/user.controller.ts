import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '@org/shared';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Req() req: Request, createUserDto: CreateUserDto) {
    return this.userService.create(req['user'], createUserDto);
  }
}
