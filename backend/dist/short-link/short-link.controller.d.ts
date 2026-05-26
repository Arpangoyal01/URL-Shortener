import { AnalyticsService } from '../analytics/analytics.service';
import type { Request, Response } from 'express';
import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
export declare class ShortLinkController {
    private readonly shortLinkService;
    private readonly analyticsService;
    constructor(shortLinkService: ShortLinkService, analyticsService: AnalyticsService);
    createShortLink(createShortLinkDto: CreateShortLinkDto): Promise<{
        shortCode: string;
    }>;
    redirect(shortCode: string, req: Request, res: Response): Promise<void>;
    getAnalytics(): Promise<import("../analytics/entities/analytics.entity").Analytics[]>;
}
