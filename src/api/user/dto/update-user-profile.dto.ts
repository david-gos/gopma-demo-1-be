import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/common/enum';

export class UpdateUserProfileDto {
  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber('VN')
  @ApiProperty({ required: false })
  phone?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ format: 'password', required: false })
  password?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  firstName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
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
