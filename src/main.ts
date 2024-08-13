import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { AllExceptionsFilter } from './filters/all_exceptions.filter';
import { ResponseInterceptor } from './interceptor/response.interceptor';
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
    .setTitle('nest-service')
    .setDescription('The nest-service API description')
    .setVersion('3.0')
    .addTag('nest-service')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token',
    ) // This name here is important for matching up with @ApiBearerAuth() in your controller!
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
