import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OperationTypeEnum } from '../enum';

export class CreatePermissionDto {
  @ApiProperty({
    type: 'string',
    description: '名称',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    description: '描述',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({
    type: 'string',
    description: '用户 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: 'number',
    description: '资源 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  resourceId: number;

  @ApiProperty({
    type: 'number',
    description: '域 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  domainId: number;

  @ApiProperty({
    type: 'string',
    description: '权限类型',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  type: OperationTypeEnum;

  @ApiProperty({
    type: 'string',
    description: '创建人',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  creator: string;
}
