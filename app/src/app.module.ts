import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinkModule } from './short-link/short-link.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password', 
      database: 'urlshortener',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ShortLinkModule,
  ],
})
export class AppModule {}