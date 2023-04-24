import { ObjectId, Schema } from 'mongoose';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class CreateUserResponseDTO {
  accessToken: string;
  refreshToken: string;

  id: any;
}
