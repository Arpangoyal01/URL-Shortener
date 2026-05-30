import { IsString, IsUrl } from 'class-validator';

export class CreateShortLinkDto {
  @IsUrl()
  url!: string;

  @IsString()
  customAlias?: string;
}