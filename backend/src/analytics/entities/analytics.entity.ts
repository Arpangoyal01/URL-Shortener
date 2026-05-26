import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { ShortLink } from '../../short-link/entities/short-link.entity';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  ipAddress!: string;

  @Column()
  userAgent!: string;

  @CreateDateColumn()
  visitedAt!: Date;

  @ManyToOne(
    () => ShortLink,
    (shortLink) => shortLink.analytics,
    {
      onDelete: 'CASCADE',
    },
  )
  shortLink!: ShortLink;
}