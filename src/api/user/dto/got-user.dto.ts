import { ApiProperty } from '@nestjs/swagger';
import { UserRoleProject } from 'src/api/user-role-project/entities';

import { Base as BaseEntity, ResponseAPI } from 'src/common/dto';
import { Gender } from 'src/common/enum';

export class GotUserDto extends BaseEntity {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ example: '0123456789' })
  phone: string;

  @ApiProperty({ example: 'Lorem', required: false })
  firstName?: string;

  @ApiProperty({ example: 'Lorem', required: false })
  lastName?: string;

  @ApiProperty({
    enum: Gender,
    required: false,
  })
  gender?: Gender;

  @ApiProperty({
    format: 'date',
    required: false,
  })
  bod?: Date;

  @ApiProperty({ required: false })
  roles: UserRoleProject[];
}

export class ResponseUserProfile extends ResponseAPI {
  @ApiProperty({})
  data: GotUserDto;
}
