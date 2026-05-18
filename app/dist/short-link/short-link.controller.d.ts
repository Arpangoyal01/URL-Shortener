import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { UpdateShortLinkDto } from './dto/update-short-link.dto';
export declare class ShortLinkController {
    private readonly shortLinkService;
    constructor(shortLinkService: ShortLinkService);
    create(createShortLinkDto: CreateShortLinkDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateShortLinkDto: UpdateShortLinkDto): string;
    remove(id: string): string;
}
