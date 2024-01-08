import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRoleProjectModule } from '../user-role-project/user-role-project.module';
import { UserModule } from '../user/user.module';
import { Project } from './entities';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    UserModule,
    UserRoleProjectModule,
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
  controllers: [ProjectController],
  providers: [ProjectService, JwtAuthGuard],
})
export class ProjectModule {}
