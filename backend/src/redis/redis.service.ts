import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: RedisClientType | null = null;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const redisUrl =
      this.configService.get<string>('REDIS_URL') ?? 'redis://redis:6379';

    this.client = createClient({
      url: redisUrl,
    });

    this.client.on('error', (error) => {
      this.logger.error(`Redis error: ${error.message}`);
    });

    try {
      await this.client.connect();
      this.logger.log(`Connected to Redis: ${redisUrl}`);
    } catch (error) {
      this.logger.warn(
        `Redis not available. App will continue without cache.`,
      );
      this.client = null;
    }
  }

  async onModuleDestroy() {
    if (this.client?.isOpen) {
      await this.client.quit();
    }
  }

  private get isReady() {
    return !!this.client && this.client.isOpen;
  }

  async getJson<T>(key: string): Promise<T | null> {
    if (!this.isReady) return null;

    const value = await this.client!.get(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  async setJson(key: string, value: unknown, ttlSeconds: number) {
    if (!this.isReady) return;

    await this.client!.setEx(key, ttlSeconds, JSON.stringify(value));
  }

  async del(key: string) {
    if (!this.isReady) return;

    await this.client!.del(key);
  }
}