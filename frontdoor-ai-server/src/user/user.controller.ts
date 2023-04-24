import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';

import { CreateUserDto, CreateUserResponseDTO } from './dto/createUser.dto';
import { User } from './schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/getAllUsers')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/getUser/:id')
  async findUser(@Param('id', new ValidationPipe()) id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createUserDTO: CreateUserDto,
  ): Promise<CreateUserResponseDTO> {
    return await this.userService.addUser(createUserDTO);
  }

  @Put('/update/:id')
  async update(
    @Param('id', new ValidationPipe()) id: string,
    @Body() updateUserDTO: Partial<User>,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserDTO);
  }

  @Delete('/deleteUser/:id')
  async deleteUser(
    @Param('id', new ValidationPipe()) id: string,
  ): Promise<string> {
    return await this.userService.deleteUser(id);
  }
}
