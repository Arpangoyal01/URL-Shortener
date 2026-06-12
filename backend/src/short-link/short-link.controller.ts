import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  async createShortLink(
    @Body() createShortLinkDto: CreateShortLinkDto,
    @Req() req: any,
  ) {

    console.log(req.user);//debug

    const link = await this.shortLinkService.create(
      createShortLinkDto.url,createShortLinkDto.customAlias, req.user.userId,
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
