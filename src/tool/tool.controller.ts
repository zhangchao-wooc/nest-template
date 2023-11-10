import { Controller, Header, Post, Body, Res, Get } from '@nestjs/common';
import { Public } from '@/auth/auth.decorator'
import { ToolService } from './tool.service';
import * as ToolDto from './tool.dto'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tool')
@Public()
@Controller('tool')
export class ToolController {
  constructor(private toolService: ToolService) {}

  @Post('web_to_image')
  async webToImage(@Body() data: ToolDto.WebToImageDto): Promise<any> {
    return await this.toolService.webToImage(data)
  }
}
