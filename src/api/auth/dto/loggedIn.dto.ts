import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Base as BaseEntity } from 'src/common/dto';
import { Gender, UserRole } from 'src/common/enum';

class LoggedInUserInfoDto extends BaseEntity {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ example: '0123456789' })
  phone: string;

  @ApiProperty({ example: 'Lorem' })
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Lorem' })
  lastName: string;

  @ApiProperty({
    enum: Gender,
    required: false,
  })
  gender?: Gender;

  @ApiProperty({
    enum: UserRole,
    required: false,
  })
  role?: UserRole;

  @ApiProperty({
    format: 'date',
    required: false,
  })
  bod?: Date;
}

export class LoggedInDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOjAsImlhdCI6MTY2MjYzMTkzOCwiZXhwIjoxNjY1MjIzOTM4fQ.d806NRcVKaBY1cAXjiMuJvLMg0DxTYdDkd269ETKnNU',
  })
  accessToken: string;
}
