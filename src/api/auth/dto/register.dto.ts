import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Gender } from 'src/common/enum';
import { IsOnlyDate, IsValidGender } from 'src/decorators/validate.decorator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ format: 'password', example: 'P@ssw0rd' })
  password: string;

  // @IsString()
  @ApiProperty({ example: 'Lorem', required: false })
  firstName?: string;

  // @IsString()
  @ApiProperty({ example: 'Lorem', required: false })
  lastName?: string;

  @IsOptional()
  @IsValidGender()
  @ApiProperty({ enum: Gender, required: false })
  gender?: Gender;

  @IsOptional()
  @IsOnlyDate()
  @ApiProperty({ format: 'date', required: false })
  bod?: Date;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  @ApiProperty({ example: '0123456789' })
  phone: string;
}
