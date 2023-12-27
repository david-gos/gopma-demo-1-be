import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './entities';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSubscriber } from './user.subscriber';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('jwt.secret');
        return {
          secret,
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
