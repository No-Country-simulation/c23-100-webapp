import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export const User = createParamDecorator(
  (
    data: keyof DecodedIdToken | undefined,
    ctx: ExecutionContext
  ): keyof DecodedIdToken | DecodedIdToken => {
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

    return user as DecodedIdToken;
  }
);
