import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { UsersModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from '../user/user.controller';
import { AuthController } from '../auth/auth.controller';
import { SummaryModule } from '../summary/summary.module';
import { SummaryController } from '../summary/summary.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    AuthModule,
    SummaryModule,
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    SummaryController,
  ],
  providers: [AppService],
})
export class AppModule {}
