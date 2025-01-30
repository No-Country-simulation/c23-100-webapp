import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Role } from '../common/enums/user-role';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getDoctors(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const startIndex = (page - 1) * limit;

    const doctors = await this.userModel
      .find({ role: Role.DOCTOR })
      .skip(startIndex)
      .limit(limit)
      .select('-password')
      .exec();

    const total = await this.userModel.countDocuments({ role: Role.DOCTOR });

    return {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: doctors,
    };
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
