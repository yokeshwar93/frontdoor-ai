import { Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { NotFoundException } from '../exceptions/notFound.exception';
import { CreateUserDto, CreateUserResponseDTO } from './dto/createUser.dto';

import { jwtConstants, SALT_HASH } from '../auth/constants';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOneByUsername(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      email,
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }
  async findOne(id: string): Promise<User> {
    const user: User = await this.userModel.findById(id);

    if (user) {
      user.password = undefined;
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async deleteUser(id: string): Promise<string> {
    const { deletedCount } = await this.userModel.deleteOne({ _id: id });
    if (deletedCount != 0) {
      return 'User deleted';
    }
    throw new NotFoundException('User not found');
  }

  async addUser(user: CreateUserDto): Promise<CreateUserResponseDTO> {
    const hashPassword = await bcrypt.hash(user.password, SALT_HASH);
    user.password = hashPassword;

    const userObject = new this.userModel(user);

    const createdUser = await userObject.save();

    const payload = {
      username: createdUser.email,
      id: createdUser._id,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
    });
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      id: createdUser._id,
    };
  }
  async updateUser(id: string, user: Partial<User>): Promise<User> {
    await this.userModel.findByIdAndUpdate(id, user);
    return this.userModel.findById(id);
  }
}
