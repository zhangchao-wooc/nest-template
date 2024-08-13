import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RemovePermissionDto {
  @ApiProperty({
    type: 'int',
    description: '权限 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: 'string',
    description: '编辑人',
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
