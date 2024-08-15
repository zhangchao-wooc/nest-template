import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { ResourceEntity } from './entities/resource.entity';
import { UsersModule } from '@/users/users.module';
import { DomainModule } from '@/domain/domain.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResourceEntity]),
    UsersModule,
    DomainModule,
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
