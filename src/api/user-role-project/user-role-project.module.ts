import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleProject } from './entities';
import { UserRoleProjectController } from './user-role-project.controller';
import { UserRoleProjectService } from './user-role-project.service';
import { UserRoleProjectSubcriber } from './user-role-project.subcriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRoleProject]),
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
  controllers: [UserRoleProjectController],
  providers: [UserRoleProjectService, UserRoleProjectSubcriber],
  exports: [UserRoleProjectService],
})
export class UserRoleProjectModule {}
