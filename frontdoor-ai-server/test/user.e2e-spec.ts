import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/user/user.module';

import { mockUser1, mockUsers } from '../src/user/__mock__/users.mock';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import supertest from 'supertest';
import * as process from 'process';
import { Connection } from 'mongoose';
import { User } from '../src/user/schemas/user.schema';

describe('User Controller (e2e)', () => {
  let app: INestApplication;
  const apiClient = () => {
    return supertest(app.getHttpServer());
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        MongooseModule.forRoot(process.env.DATABASE_URL, {
          dbName: 'e2e-test',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(async () => {
    await (app.get(getConnectionToken()) as Connection).db.dropDatabase();
    await app.close();
  });
  it('/ (GET)', async () => {
    await apiClient()
      .post('/users/create')
      .send({
        content: mockUser1,
      })
      .expect(201);
    const users: User[] = (await apiClient().get('/users/getAllUsers')).body;
    expect(users.length).toBe(1);
  });
});
