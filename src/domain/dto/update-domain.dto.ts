import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDomainDto } from './create-domain.dto';

export class UpdateDomainDto extends PartialType(CreateDomainDto) {
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
