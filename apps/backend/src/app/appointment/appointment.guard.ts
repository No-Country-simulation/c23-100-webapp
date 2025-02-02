import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { Role } from '../common/enums/user-role'; 
  
  @Injectable()
  export class AppointmentGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request: Request = context.switchToHttp().getRequest();
      const user = request['user']; // Se asume que el usuario ya está autenticado y en la request
  
      if (!user) {
        throw new UnauthorizedException('Usuario no registrado');
      }
  
      if (user.role !== Role.ADMIN) {
        throw new UnauthorizedException(
          'El usuario no tiene permisos para acceder a este recurso'
        );
      }
  
      return true;
    }
  }
  