import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Project } from 'src/api/project/entities';
import { User } from 'src/api/user/entities';
import { PermissionProject } from 'src/common/enum';

export class CreateUserRoleProjectDto {
  @IsOptional()
  @IsEnum(PermissionProject)
  @ApiProperty({ enum: PermissionProject })
  permission: PermissionProject;

  @ApiProperty({})
  user: User;

  @ApiProperty({})
  project: Project;
}
