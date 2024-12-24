import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LocalLoginDto {
  @ApiProperty({
    type: 'string',
    description: '昵称/邮箱/手机号',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  account: string;

  @ApiProperty({
    type: 'string',
    description: '密码',
    required: true,
  })
  @IsString()
  password: string;
}
