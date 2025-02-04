import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Role } from '../common/enums/user-role';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { DoctorSpecialization } from '../common/enums/doctor-specialization';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getDoctors(specialization: DoctorSpecialization) {
    const doctors = await this.userModel
      .find({ specialization })
      .select('-password')
      .exec();

    return doctors;
  }

  async getProfile(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .select('-__v')
      .exec();

    if (!user) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }

    return user;
  }
}
