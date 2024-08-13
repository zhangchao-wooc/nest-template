import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ResourceTypeEnum } from '../enum';

export class CreateResourceDto {
  @ApiProperty({
    type: 'string',
    description: '资源名称',
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
    description: '资源值',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    type: 'string',
    description: '资源类型',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  type: ResourceTypeEnum;

  @ApiProperty({
    type: 'string',
    description: '创建人',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  creator: string;

  @ApiProperty({
    type: 'number',
    description: '域 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  domainId: number;
}
