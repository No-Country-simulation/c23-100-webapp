import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto, PaginationDto } from '@org/shared';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { User } from '../common/decorators/user.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@User('uid') userId: string, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(userId, createUserDto);
  }

  @Get('doctors')
  getDoctors(@Query() paginationDto: PaginationDto) {
    return this.userService.getDoctors(paginationDto);
  }

  @Get('profile')
  getProfile(@User('uid') userId: string) {
    return this.userService.getProfile(userId);
  }
}
