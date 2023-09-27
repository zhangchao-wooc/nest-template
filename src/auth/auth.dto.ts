import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    type: 'string',
    description: '手机号',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: 'string',
    description: '密码',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateUsersDto {
  @ApiProperty({
    type: 'string',
    description: '手机号',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: 'string',
    description: '密码',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
