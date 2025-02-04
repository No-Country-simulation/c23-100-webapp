import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { User } from '../common/decorators/user.decorator';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ParseDoctorSpecializationPipe } from '../common/pipes/parse-doctor-specialization.pipe';
import { DoctorSpecialization } from '../common/enums/doctor-specialization';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('doctors/:specialization')
  getDoctors(
    @Param('specialization', ParseDoctorSpecializationPipe)
    specialization: DoctorSpecialization
  ) {
    return this.userService.getDoctors(specialization);
  }

  @Get('profile')
  getProfile(@User('sub') userId: string) {
    return this.userService.getProfile(userId);
  }
}
