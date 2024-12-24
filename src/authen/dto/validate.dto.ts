import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class ValidateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'nickName/email/phoneNumber',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  account: string;

  @ApiProperty({
    type: 'string',
    description: 'Password',
    required: false,
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Validate passowrd',
    required: false,
  })
  @IsBoolean()
  validatePassword?: boolean;
}
