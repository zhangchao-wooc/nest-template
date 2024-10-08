import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({
    type: 'string',
    description: '创建人',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  editor: string;

  @ApiProperty({
    type: 'string',
    description: '状态',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
