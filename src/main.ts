import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from '@/filters/all_exceptions.filter';
import { ResponseInterceptor } from '@/interceptor/response.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
    bufferLogs: true,
    abortOnError: false,
    httpsOptions: {
      key: fs.readFileSync('./ssl/private.key'),
      cert: fs.readFileSync('./ssl/certificate.crt'),
    },
  });

  app.setGlobalPrefix('api');

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(app.get(Logger)));

  const config = new DocumentBuilder()
    .setTitle('wanyu-service')
    .setDescription('The wanyu-service API description')
    .setVersion('3.0')
    .addTag('wanyu-service')
    .addBearerAuth() // This name here is important for matching up with @ApiBearerAuth() in your controller!
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('open-apis', app, document);

  app.use(helmet());
  app.use(cookieParser());

  await app.listen(process.env.NODE_PORT || 8888, () => {
    console.log(`app service listen: ${process.env.NODE_PORT || 8888}`);
  });
}
bootstrap();
