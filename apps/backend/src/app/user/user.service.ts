import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, User } from '@org/shared';
import { FirestoreService } from '../database/firestore.service';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class UserService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async create(
    userToken: DecodedIdToken,
    createUserDto: CreateUserDto
  ): Promise<User> {
    const { uid: id } = userToken;

    try {
      await this.firestoreService.getDocument('user', id);

      throw new UnauthorizedException(
        `El usuario con ${userToken.email} ya se encuentra registrado.`
      );
    } catch {
      return await this.firestoreService.createDocument<User>(
        'user',
        createUserDto,
        id
      );
    }
  }
}
