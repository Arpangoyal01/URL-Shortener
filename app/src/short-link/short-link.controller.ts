import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';

@Controller()
export class ShortLinkController {
  constructor(
    private readonly shortLinkService: ShortLinkService,
  ) {}

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

  @Get(':shortCode')
  async redirect(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ) {
    const link =
      await this.shortLinkService.findOneByCode(
        shortCode,
      );

    if (!link) {
      throw new NotFoundException(
        'Short link not found',
      );
    }

    return res.redirect(301, link.longUrl);
  }
}