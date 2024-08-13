import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDomainDto {
  @ApiProperty({
    type: 'string',
    description: '域名称',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    description: '域描述',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({
    type: 'string',
    description: '创建人',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  creator: string;
}
