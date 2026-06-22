import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinkModule } from './short-link/short-link.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    RedisModule,

    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 10,
      },
    ]),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),
    ShortLinkModule,
    AnalyticsModule,
  ],
  providers: [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
],
})
export class AppModule { }