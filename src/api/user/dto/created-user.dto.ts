import { ApiProperty } from '@nestjs/swagger';

import { Base as BaseEntity } from 'src/common/dto';
import { Gender, UserRole } from 'src/common/enum';

export class CreatedUserDto extends BaseEntity {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ example: '0123456789' })
  phone: string;

  @ApiProperty({ example: 'Lorem', required: false })
  firstName?: string;

  @ApiProperty({ example: 'Lorem', required: false })
  lastName?: string;

  @ApiProperty({ enum: Gender, required: false })
  gender?: Gender;

  @ApiProperty({ format: 'date', required: false })
  bod?: Date;

  @ApiProperty({
    enum: UserRole,
    required: false,
  })
  role?: UserRole;
}
