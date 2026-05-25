import { Repository } from 'typeorm';
import { ShortLink } from './entities/short-link.entity';
export declare class ShortLinkService {
    private shortLinkRepository;
    constructor(shortLinkRepository: Repository<ShortLink>);
    findOneByCode(shortCode: string): Promise<ShortLink | null>;
    create(longUrl: string): Promise<ShortLink>;
    private generateUniqueShortCode;
}
