import { Module, Dependencies } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DataSource } from 'typeorm';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const envFilePath = ['.env'];
if (process.env.NODE_ENV === 'production') {
  envFilePath.unshift('.env.prod');
} else {
  envFilePath.unshift('.env.dev');
}

@Dependencies(DataSource)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(
          'MYSQL: ',
          configService.get<string>('MYSQL_HOST', 'localhost'),
          configService.get<string>('MYSQL_PORT', '3306'),
          configService.get<string>('MYSQL_USER', 'root'),
          configService.get<string>('MYSQL_PASS', 'root123456'),
          configService.get<string>('MYSQL_DB', 'nest_template'),
        );
        return {
          type: 'mysql',
          host: configService.get<string>('MYSQL_HOST', 'localhost'),
          port: configService.get<number>('MYSQL_PORT', 3306),
          username: configService.get<string>('MYSQL_USER', 'root'),
          password: configService.get<string>('MYSQL_PASS', 'root123456'),
          database: configService.get<string>('MYSQL_DB', 'nest_template'),
          timezone: '+08:00',
          autoLoadEntities: true,
          synchronize: true, // 实体与表同步 调试模式下开始。不然会有强替换导致数据丢是
        };
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:yyyy-mm-dd, HH:MM:ss TT Z',
          },
        },
        level: (() => {
          const logLevel = {
            production: 'info',
            development: 'debug',
            test: 'error',
          };

          return logLevel[process.env.NODE_ENV] || 'info';
        })(),
        autoLogging: false,
        redact: ['req.headers.authorization'],
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/api/(.*)'],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
