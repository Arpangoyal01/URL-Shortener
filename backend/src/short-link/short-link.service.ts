import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShortLink } from './entities/short-link.entity';

import * as crypto from 'crypto';

@Injectable()
export class ShortLinkService {
  constructor(
    @InjectRepository(ShortLink)
    private shortLinkRepository: Repository<ShortLink>,
  ) { }

  // it is finding first raw value of coloumn from database table
  async findOneByCode(shortCode: string) {
    return this.shortLinkRepository.findOneBy({ shortCode });
  }

  // // this is checking already existing url in database
  // async create(longUrl: string,) {
  //   const existing =
  //     await this.shortLinkRepository.findOneBy({
  //       longUrl, 
  //     });

  //   if (existing) {
  //     return existing;
  //   }

  //   const shortCode =
  //     await this.generateUniqueShortCode(longUrl);
  //     //create() performs in memory and makes it combined one entity object
  //     const newLink =  
  //     this.shortLinkRepository.create({ 
  //       longUrl,
  //       shortCode,
  //     });

  //   return this.shortLinkRepository.save(newLink);
  // }


  //custom alias
  async create(
    longUrl: string,
    customAlias?: string,
    userId?:number,
  ) {
    const existing =
      await this.shortLinkRepository.findOneBy({
        longUrl,
      });

    if (existing) {
      return existing;
    }

    if (customAlias) {
      const aliasExists =
        await this.shortLinkRepository.findOneBy({
          shortCode: customAlias,
        });

      if (aliasExists) {
        throw new ConflictException(
          'Custom alias already taken',
        );
      }

      const newLink =
        this.shortLinkRepository.create({
          longUrl,
          shortCode: customAlias,
          userId,
        });

      return this.shortLinkRepository.save(newLink);
    }

    const shortCode =
      await this.generateUniqueShortCode(longUrl);

    const newLink =
      this.shortLinkRepository.create({
        longUrl,
        shortCode,
      });

    return this.shortLinkRepository.save(newLink);
  }


  private async generateUniqueShortCode(
    longUrl: string,
  ): Promise<string> {
    const HASH_LENGTH = 7;

    let attempt = 0;

    while (attempt < 10) {
      const salt = attempt > 0 ? String(attempt) : '';

      const hash = crypto
        .createHash('sha256')
        .update(longUrl + salt)
        .digest('base64url')
        .substring(0, HASH_LENGTH);

      const exists =
        await this.findOneByCode(hash);

      if (!exists) {
        return hash;
      }

      attempt++;
    }

    throw new InternalServerErrorException(
      'Unable to generate short code',
    );
  }
}