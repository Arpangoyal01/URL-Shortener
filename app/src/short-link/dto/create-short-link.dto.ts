import { IsUrl } from 'class-validator';

export class CreateShortLinkDto {
  @IsUrl()
  url: string;
}