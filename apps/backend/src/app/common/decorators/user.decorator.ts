import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../enums/user-role';
import { DoctorSpecialization } from '../enums/doctor-specialization';

interface UserTokenMetadata {
  sub: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  specialization?: DoctorSpecialization;
}

export const User = createParamDecorator(
  (
    data: keyof UserTokenMetadata | undefined,
    ctx: ExecutionContext
  ): keyof UserTokenMetadata | UserTokenMetadata => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      throw new UnauthorizedException(
        'Usuario no autenticado. Por favor, inicie sesión.'
      );
    }

    if (data && !(data in user)) {
      throw new UnauthorizedException(
        `El atributo solicitado "${data}" no existe en el token del usuario.`
      );
    } else {
      return user[data];
    }

    return user as UserTokenMetadata;
  }
);
