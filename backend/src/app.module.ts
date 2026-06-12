import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ShortLinkModule } from './short-link/short-link.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './authentication/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url:process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl:{
        rejectUnauthorized: false,
      },
    }),
    ShortLinkModule,
    AnalyticsModule,
    AuthModule,
  ],
  providers: [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
],
})
export class AppModule { }