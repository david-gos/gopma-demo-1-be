import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PermissionProject } from 'src/common/enum';

export class AddCollaboratorProject {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  projectId: string;

  @IsOptional()
  @IsEnum(PermissionProject)
  @ApiProperty({ enum: PermissionProject })
  permission: PermissionProject;
}
