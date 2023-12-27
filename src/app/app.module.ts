import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'env.validation';
import { DatabaseModule } from '../database/database.module';
import configuration from '../config/configuration';
import { AuthModule } from '../api/auth/auth.module';
import { UserModule } from '../api/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
