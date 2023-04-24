import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(email);

    const isMatch = await bcrypt.compare(pass, user?.password);
    if (user && isMatch) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, id: user._id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: process.env.JWT_TOKEN_EXPIRY,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
      }),
      id: user._id,
    };
  }
  async getAuthTokenFromRefreshToken(id: string) {
    const user = await this.usersService.findOne(id);
    return this.login({ ...user, password: undefined });
  }
}
