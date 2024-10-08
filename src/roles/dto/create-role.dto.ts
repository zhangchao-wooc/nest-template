import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    type: 'string',
    description: '角色名称',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: 'string',
    description: '角色描述',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({
    type: 'number',
    description: '域的 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  domainId: number;

  @ApiProperty({
    type: 'string',
    description: '创建人',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  creator: string;
}
