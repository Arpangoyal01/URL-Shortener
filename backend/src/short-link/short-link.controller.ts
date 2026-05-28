import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  Req,
} from '@nestjs/common';

import { AnalyticsService } from '../analytics/analytics.service';

import type { Request, Response } from 'express';

import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';

@Controller()
export class ShortLinkController {
  constructor(
    private readonly shortLinkService: ShortLinkService,
    private readonly analyticsService: AnalyticsService,
  ) { }

  @Post('shorten')
  async createShortLink(
    @Body() createShortLinkDto: CreateShortLinkDto,
  ) {
    const link = await this.shortLinkService.create(
      createShortLinkDto.url,
    );

    return {
      shortCode: link.shortCode,
    };
  }

  @Get('analytics/all')
  async getAnalytics() {
  return this.analyticsService.findAll();
  }
  
  @Get(':shortCode')
  async redirect(
    @Param('shortCode') shortCode: string,
    @Req() req:Request,
    @Res() res: Response,
  ) {
    const link =
      await this.shortLinkService.findOneByCode(
        shortCode
      );

    if (!link) {
      throw new NotFoundException(
        'Short link not found',
      );
    }
    await this.
    analyticsService.create(
    link,
    req.ip || 'unknown',
    req.headers['user-agent'] || 'unknown',
  );

    return res.redirect(301, link.longUrl);
  }

}
