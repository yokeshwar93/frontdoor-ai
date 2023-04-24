import { Test } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { mockUser1, mockUser2, mockUsers } from './__mock__/users.mock';
import { connect, Connection, Model } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { NotFoundException } from '../exceptions/notFound.exception';

describe('UserController', () => {
  let userController: UsersController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    userController = moduleRef.get<UsersController>(UsersController);
  }, 10000);

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  }, 10000);

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await new userModel(mockUser1).save();
      await new userModel(mockUser2).save();
      const users = await userController.findAll();
      expect(users.length).toBe(2);
    });
  });
  describe('find', () => {
    it('should return an user if found', async () => {
      const result = mockUser1;
      const createdUser = await new userModel(mockUser1).save();
      const user = await userController.findUser(createdUser._id);
      expect(result.name).toBe(user.name);
    });
    it('should throw exception if user not found', async () => {
      let response;
      try {
        await userController.findUser(mockUsers[0]._id);
      } catch (e: any) {
        response = e;
      }
      expect(response).toStrictEqual(new NotFoundException('User not found'));
    });
  });
  describe('create', () => {
    it('should return created user', async () => {
      const user = await userController.create(mockUser1);
      expect(user.accessToken).toBeDefined();
      expect(user.refreshToken).toBeDefined();
      expect(user.id).toBeDefined();
    });
  });
  describe('update', () => {
    it('should return updated user', async () => {
      const createdUser = await new userModel(mockUser1).save();
      const user = await userController.update(createdUser._id, {
        name: 'Test',
      });
      expect(user.name).toBe('Test');
    });
  });
  describe('delete', () => {
    it('should delete the user', async () => {
      const createdUser = await new userModel(mockUser1).save();
      const response = await userController.deleteUser(createdUser._id);
      expect(response).toBe('User deleted');
    });
    it('should throw exception if user not found', async () => {
      let response;
      try {
        await userController.deleteUser(mockUsers[0]._id);
      } catch (e: any) {
        response = e;
      }
      expect(response).toStrictEqual(new NotFoundException('User not found'));
    });
  });
});
