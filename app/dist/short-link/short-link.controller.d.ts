import type { Response } from 'express';
import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
export declare class ShortLinkController {
    private readonly shortLinkService;
    constructor(shortLinkService: ShortLinkService);
    createShortLink(createShortLinkDto: CreateShortLinkDto): Promise<{
        shortCode: string;
    }>;
    redirect(shortCode: string, res: Response): Promise<void>;
}
