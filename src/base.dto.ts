import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PagedSearchDto {
  @ApiProperty({
    type: 'number',
    description: 'Current page number',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    type: 'number',
    description: 'Count of items per page',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @ApiProperty({
    type: 'enum',
    description: 'Order of items. Default is DESC',
    default: 'DESC',
    enum: ['ASC', 'DESC'],
    required: false,
  })
  order?: 'DESC' | 'ASC';

  @ApiProperty({
    type: 'any',
    description: 'Other search criteria. Default is null',
    default: null,
    required: false,
  })
  data: any;
}
