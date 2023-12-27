import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Gender } from 'src/common/enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ format: 'email' })
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  @ApiProperty({ example: '0123456789' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ format: 'password', example: 'P@ssw0rd' })
  password: string;

  @IsString()
  @ApiProperty({ example: 'Lorem', required: false })
  firstName?: string;

  @IsString()
  @ApiProperty({ example: 'Lorem', required: false })
  lastName?: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({ enum: Gender, required: false })
  gender?: Gender;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ format: 'date', required: false })
  bod?: Date;
}
