import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirestoreService } from '../database/firestore.service';
import { User } from '../common/interfaces/user';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Role } from '../common/enums/user-role';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async create(userId: string, createUserDto: CreateUserDto): Promise<User> {
    try {
      await this.firestoreService.getDocument('user', userId);

      throw new UnauthorizedException(
        `El usuario con id: ${userId} ya se encuentra registrado.`
      );
    } catch {
      return await this.firestoreService.createDocument<User>(
        'user',
        createUserDto,
        userId
      );
    }
  }

  async getDoctors(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const users = await this.firestoreService.getCollection<User>('user');
    const doctors = users.filter((user) => user.role === Role.DOCTOR);
    const filteredDoctors = doctors.filter(
      (_, index) => index >= startIndex && index < endIndex
    );

    return filteredDoctors;
  }

  async getProfile(userId: string): Promise<User> {
    return await this.firestoreService.getDocument<User>('user', userId);
  }
}
