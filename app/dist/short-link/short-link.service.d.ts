import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { UpdateShortLinkDto } from './dto/update-short-link.dto';
export declare class ShortLinkService {
    create(createShortLinkDto: CreateShortLinkDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateShortLinkDto: UpdateShortLinkDto): string;
    remove(id: number): string;
}
