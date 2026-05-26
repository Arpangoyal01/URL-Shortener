import { Analytics } from '../../analytics/entities/analytics.entity';
export declare class ShortLink {
    id: string;
    shortCode: string;
    longUrl: string;
    createdAt: Date;
    analytics: Analytics[];
}
