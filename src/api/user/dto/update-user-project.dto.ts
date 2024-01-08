import { ApiProperty } from '@nestjs/swagger';
import { UserRoleProject } from 'src/api/user-role-project/entities';

export class UpdateUserProject {
  @ApiProperty({})
  role: UserRoleProject;
}
