import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Analytics } from './entities/analytics.entity';
import { ShortLink } from '../short-link/entities/short-link.entity'; 

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
  ) {}

  async create(
    shortLink: ShortLink,
    ipAddress: string,
    userAgent: string,
  ) {
    const analytics =
      this.analyticsRepository.create({
        shortLink,
        ipAddress,
        userAgent,
      });

    return this.analyticsRepository.save(
      analytics,
    );
  }
  async findAll() {
  return this.analyticsRepository.find({
    relations: ['shortLink'],
  });
}

async getAnalytics(shortCode: string) {
  return this.analyticsRepository.find({
    where: {
      shortLink: {
        shortCode,
      },
    },
    relations: ['shortLink'],
    order: {
      visitedAt: 'DESC',
    },
  });
}
}