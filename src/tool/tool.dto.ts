import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isEmpty } from 'class-validator';
import type { ScreenshotOptions } from 'puppeteer'

export class WebToImageDto {
  @ApiProperty({
    type: String,
    description: '生成的图片格式: ',
    default: 'png',
    enum: ['png', 'jpeg', 'webp' ],
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  type: 'png' | 'jpeg' | 'webp';

  @ApiProperty({
    type: String,
    description: '网页路径',
    default: '',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    type: Number,
    description: '设置浏览器视口宽度',
    required: false,
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    type: Number,
    description: '设置浏览器视口高度',
    required: false,
  })
  @IsNumber()
  height: number;
}
