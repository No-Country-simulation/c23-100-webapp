/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid MongoDB ID');
    }

    return new Types.ObjectId(value);
  }
}
