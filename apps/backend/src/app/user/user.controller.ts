import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { User } from '../common/decorators/user.decorator';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('doctors')
  getDoctors(@Query() paginationDto: PaginationDto) {
    return this.userService.getDoctors(paginationDto);
  }

  @Get('profile')
  getProfile(@User('sub') userId: string) {
    return this.userService.getProfile(userId);
  }
}
