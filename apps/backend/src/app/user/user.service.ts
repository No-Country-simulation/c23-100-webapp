import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, PaginationDto, Role, User } from '@org/shared';
import { FirestoreService } from '../database/firestore.service';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } =
        await this.firestoreService.createDocument(
          'user',
          createUserDto,
          userId
        );

      return userData;
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
