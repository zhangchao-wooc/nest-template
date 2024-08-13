import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PageDto {
  @ApiProperty({
    type: 'number',
    description: '当前页码',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({
    type: 'number',
    description: '当前页数据条数',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @ApiProperty({
    type: 'enum',
    description: '排序字段及方式。默认为创建时间倒序 DESC',
    default: 'DESC',
    enum: ['ASC', 'DESC'],
    required: false,
  })
  order?: 'DESC' | 'ASC';

  @ApiProperty({
    type: 'any',
    description: '其他搜索条件',
    default: null,
    required: false,
  })
  data: any;
}
