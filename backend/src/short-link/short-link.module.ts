import { Module } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { ShortLinkController } from './short-link.controller';
import { ShortLink} from './entities/short-link.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnalyticsModule } from '../analytics/analytics.module'
@Module({
  imports: [TypeOrmModule.forFeature([ShortLink]),AnalyticsModule,],
  controllers: [ShortLinkController],
  providers: [ShortLinkService],
})
export class ShortLinkModule {}
