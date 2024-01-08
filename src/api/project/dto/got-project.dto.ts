import { ApiProperty } from '@nestjs/swagger';
import { UserRoleProjectDto } from 'src/api/user-role-project/dto';
import { ResponseAPI } from 'src/common/dto';
import { Project } from '../entities';

export class ResponseProject extends ResponseAPI {
  @ApiProperty({})
  data: Project;
}

export class ResponseListProject extends ResponseAPI {
  @ApiProperty({})
  data: Project[];
}

export class ResponseUserRoleProject extends ResponseAPI {
  @ApiProperty()
  data: UserRoleProjectDto;
}
