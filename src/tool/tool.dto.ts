import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isEmpty } from 'class-validator';
import type { ScreenshotOptions } from 'puppeteer'

export class WebToImageDto {
  @ApiProperty({
    type: String,
    description: '截图图片格式: ',
    default: 'png',
    enum: ['png', 'jpeg', 'webp' ],
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  type: ScreenshotOptions['type'];

  @ApiProperty({
    type: String,
    description: '网页地址',
    default: '',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    type: Number,
    description: '设置浏览器视口宽度',
    default: 800,
    required: false,
  })
  @IsNumber()
  width?: number;

  @ApiProperty({
    type: Number,
    description: '设置浏览器视口高度',
    default: 600,
    required: false,
  })
  @IsNumber()
  height?: number;

  @ApiProperty({
    type: String,
    description: '返回的数据格式',
    default: 'binary',
    enum: ['binary', 'base64' ],
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  encoding?: ScreenshotOptions['encoding'];
}
