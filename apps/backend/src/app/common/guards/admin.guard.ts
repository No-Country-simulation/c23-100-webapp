import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request['user'];

    if (!user) {
      throw new UnauthorizedException('Usuario no registrado');
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException(
        'El usuario no tiene permisos para acceder a este recurso'
      );
    }

    return true;
  }
}
