import { ApiProperty } from '@nestjs/swagger';
import { ResponseAPI } from 'src/common/dto';
import { DeleteResult } from 'typeorm';
import { UserRoleProjectDto } from './user-role-project.dto';

export class ResponseUpdatedUserRoleProject extends ResponseAPI {
  @ApiProperty({})
  data: UserRoleProjectDto;
}

export class ResponseDeleteUserRoleProject extends ResponseAPI {
  @ApiProperty({})
  data: DeleteResult;
}
