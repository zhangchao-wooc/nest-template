import { ApiProperty } from '@nestjs/swagger';
import { PageDto } from '@/base.dto';

export class QueryResourceListDto extends PageDto {
  @ApiProperty({
    type: 'object',
    description: '搜索条件',
    default: {},
    required: false,
  })
  data: Record<string, any>;
}