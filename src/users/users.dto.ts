import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isEmpty } from 'class-validator';

export class LoginAccountDto {
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

export class UpdateUsersDto {
  @ApiProperty({
    type: 'string',
    description: 'userId',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: 'string',
    description: '用户名称',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    description: '邮箱',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: 'string',
    description: '密码',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: 'string',
    description: '头像',
  })
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty({
    type: 'string',
    description: '个人介绍',
  })
  @IsString()
  @IsNotEmpty()
  introduce: string;

  @ApiProperty({
    type: 'string',
    description: '信息更新时间',
  })
  @IsString()
  @IsNotEmpty()
  updateTime: Date;
}

export class DeleteUsersDto {
  @ApiProperty({
    type: 'string',
    description: 'userId',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class GetUsersByIdDto {
  @ApiProperty({
    type: 'string',
    description: 'userId',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UsersInfoDto {
  @ApiProperty({
    type: 'string',
    description: 'userId',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
