import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Role } from '@org/shared';

@Injectable()
export class MedicalRecordsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request['user'];

    if (user.role !== Role.DOCTOR) {
      return false;
    }

    return true;
  }
}
