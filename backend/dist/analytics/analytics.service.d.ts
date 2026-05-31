import { Repository } from 'typeorm';
import { Analytics } from './entities/analytics.entity';
import { ShortLink } from '../short-link/entities/short-link.entity';
export declare class AnalyticsService {
    private analyticsRepository;
    constructor(analyticsRepository: Repository<Analytics>);
    create(shortLink: ShortLink, ipAddress: string, userAgent: string): Promise<Analytics>;
    findAll(): Promise<Analytics[]>;
    getAnalytics(shortCode: string): Promise<Analytics[]>;
}
