import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer'
import * as ToolDto from './tool.dto'

@Injectable()
export class ToolService {

  async webToImage(data: ToolDto.WebToImageDto): Promise<Buffer> {
    console.log('webToImage', data)
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto(data.url, {
      waitUntil: 'domcontentloaded'
    });

    const dimensions = await page.evaluate(() => {
      return {
        width: data.width || document.documentElement.clientWidth,
        height: data.height || document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });
    
    await page.setViewport({ width: dimensions.width, height: dimensions.height });

    const screenshot_buffer = await page.screenshot({
      type: data.type
    });

    await browser.close();

    return screenshot_buffer
  }
}
