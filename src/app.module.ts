import { Module, Dependencies } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from '@/health/health.module';
import { AuthModule } from '@/authentication/authentication.module';
import { UsersModule } from '@/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToolController } from './tool/tool.controller';
import { ToolService } from './tool/tool.service';
import { ToolModule } from './tool/tool.module';
import { AuthorizationModule } from './authorization/authorization.module';

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
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: configService.get<number>('REDIS_PORT', 6379),
          db: configService.get<number>('REDIS_DB', 0),
          ttl: configService.get<number>('REDIS_TTL', 600),
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
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
    HealthModule,
    AuthModule,
    UsersModule,
    ToolModule,
    AuthorizationModule,
  ],
  controllers: [AppController, ToolController],
  providers: [AppService, ToolService],
})
export class AppModule {}
