import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PermissionProject } from 'src/common/enum';

export class UpdateUserRoleProject {
  @IsOptional()
  @IsEnum(PermissionProject)
  //   @Transform(({ value }) => PermissionProject[value] || null)
  @ApiProperty({ enum: PermissionProject, required: true })
  permission: PermissionProject;
}
