import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as ToolDto from './tool.dto';

@Injectable()
export class ToolService {
  async webToImage(data: ToolDto.WebToImageDto): Promise<string | Buffer> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    // Notice
    // Error: net::ERR_CONNECTION_RESET 网站服务器拒绝 chrome headless 作为客户端
    // 更改了标题中的 userAgent。这样，网站服务器就认为这是来自浏览器的请求，一切正常！
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36',
    );
    await page.goto(data.url, {
      waitUntil: ['load', 'domcontentloaded'],
    });

    const dimensions = await page.evaluate((data) => {
      return {
        width: data.width || document.documentElement.clientWidth,
        height: data.height || document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio,
      };
    }, data);

    await page.setViewport({
      width: dimensions.width,
      height: dimensions.height,
    });

    let screenshotResult: string | Buffer = await page.screenshot({
      type: data.type,
      encoding: data.encoding,
    });

    await browser.close();

    if (data.encoding === 'base64') {
      screenshotResult = `data:image/${data.type};base64,${screenshotResult}`;
    }

    return screenshotResult;
  }
}
