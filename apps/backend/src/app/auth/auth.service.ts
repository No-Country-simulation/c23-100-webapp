/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email }).exec();

    if (!user) {
      throw new NotFoundException(
        `El usuario con email ${loginDto.email} no se encuentra registrado`
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const userObject = user.toObject();
    const { password, _id: sub, ...data } = userObject;
    const userToken = await this.jwtService.signAsync({
      ...data,
      sub,
    });

    return { userToken };
  }

  async signup(signupDto: SignUpDto) {
    const userExists = await this.userModel.findOne({ email: signupDto.email });

    if (userExists) {
      throw new ConflictException(
        `Ya existe un usuario registrado con este email`
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
      const newUser = new this.userModel({
        ...signupDto,
        password: hashedPassword,
      });
      const user = await newUser.save();

      const userObject = user.toObject();
      const { password, _id: sub, ...data } = userObject;
      const userToken = await this.jwtService.signAsync({
        ...data,
        sub,
      });

      return { userToken };
    } catch {
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }
}
