import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../common/enums/user-role';
import { DoctorSpecialization } from '../../common/enums/doctor-specialization';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, trim: true, minlength: 6 })
  password: string;

  @Prop({ required: true, type: String, enum: Role })
  role: Role;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ type: String, enum: DoctorSpecialization })
  specialization?: DoctorSpecialization;
}

export const UserSchema = SchemaFactory.createForClass(User);
