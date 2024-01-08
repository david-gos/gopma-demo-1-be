import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'env.validation';
import { ProjectModule } from 'src/api/project/project.module';
import { AuthModule } from '../api/auth/auth.module';
import { UserModule } from '../api/user/user.module';
import configuration from '../config/configuration';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ProjectModule,
  ],
  providers: [],
})
export class AppModule {}
