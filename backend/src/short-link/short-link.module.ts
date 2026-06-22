import { Module } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { ShortLinkController } from './short-link.controller';
import { ShortLink} from './entities/short-link.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnalyticsModule } from '../analytics/analytics.module'
import { RedisModule } from '../redis/redis.module';
@Module({
  imports: [TypeOrmModule.forFeature([ShortLink]),AnalyticsModule,RedisModule,],
  controllers: [ShortLinkController],
  providers: [ShortLinkService],
  exports: [ShortLinkService],
})
export class ShortLinkModule {}
