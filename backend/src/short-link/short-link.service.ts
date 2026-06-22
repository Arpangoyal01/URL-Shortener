import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShortLink } from './entities/short-link.entity';
import * as crypto from 'crypto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ShortLinkService {
  private readonly CACHE_TTL_SECONDS = 24 * 60 * 60; // 24 hour

  constructor(
    @InjectRepository(ShortLink)
    private shortLinkRepository: Repository<ShortLink>,
    private readonly redisService: RedisService,
  ) {}

  private cacheKey(shortCode: string) {
    return `shortlink:${shortCode}`;
  }

  async findOneByCode(shortCode: string) {
    const key = this.cacheKey(shortCode);

    const cached = await this.redisService.getJson<ShortLink>(key);
    if (cached) {
      return cached;
    }

    const link = await this.shortLinkRepository.findOneBy({ shortCode });

    if (link) {
      await this.redisService.setJson(key, link, this.CACHE_TTL_SECONDS);
    }

    return link;
  }

  async create(longUrl: string, customAlias?: string) {
    const existing = await this.shortLinkRepository.findOneBy({ longUrl });

    if (existing) {
      await this.redisService.setJson(
        this.cacheKey(existing.shortCode),
        existing,
        this.CACHE_TTL_SECONDS,
      );
      return existing;
    }

    if (customAlias) {
      const aliasExists = await this.findOneByCode(customAlias);

      if (aliasExists) {
        throw new ConflictException('Custom alias already taken');
      }

      const newLink = this.shortLinkRepository.create({
        longUrl,
        shortCode: customAlias,
      });

      const saved = await this.shortLinkRepository.save(newLink);

      await this.redisService.setJson(
        this.cacheKey(saved.shortCode),
        saved,
        this.CACHE_TTL_SECONDS,
      );

      return saved;
    }

    const shortCode = await this.generateUniqueShortCode(longUrl);

    const newLink = this.shortLinkRepository.create({
      longUrl,
      shortCode,
    });

    const saved = await this.shortLinkRepository.save(newLink);

    await this.redisService.setJson(
      this.cacheKey(saved.shortCode),
      saved,
      this.CACHE_TTL_SECONDS,
    );

    return saved;
  }

  private async generateUniqueShortCode(longUrl: string): Promise<string> {
    const HASH_LENGTH = 7;
    let attempt = 0;

    while (attempt < 10) {
      const salt = attempt > 0 ? String(attempt) : '';

      const hash = crypto
        .createHash('sha256')
        .update(longUrl + salt)
        .digest('base64url')
        .substring(0, HASH_LENGTH);

      const exists = await this.findOneByCode(hash);

      if (!exists) {
        return hash;
      }

      attempt++;
    }

    throw new InternalServerErrorException('Unable to generate short code');
  }
}