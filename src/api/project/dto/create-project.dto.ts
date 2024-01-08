import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PermissionProject } from 'src/common/enum';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'My project' })
  name: string;

  @IsOptional()
  @IsEnum(PermissionProject)
  @ApiProperty({ enum: PermissionProject, required: false })
  permission?: PermissionProject;
}
