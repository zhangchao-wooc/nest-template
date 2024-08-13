import { PartialType } from '@nestjs/swagger';
import { CreateResourceDto } from './create-resource.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {
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
