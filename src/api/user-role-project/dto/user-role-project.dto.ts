import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/api/project/entities';
import { User } from 'src/api/user/entities';
import { Base as BaseEntity } from 'src/common/dto';
import { PermissionProject } from 'src/common/enum';

export class UserRoleProjectDto extends BaseEntity {
  @ApiProperty({ enum: PermissionProject })
  permission: PermissionProject;

  @ApiProperty({})
  user: User;

  @ApiProperty({})
  project: Project;
}
