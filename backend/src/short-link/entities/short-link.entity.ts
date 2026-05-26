import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { OneToMany } from 'typeorm';
import { Analytics } from '../../analytics/entities/analytics.entity';

@Entity()
export class ShortLink {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @Index()
  shortCode!: string;

  @Column('text')
  longUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(
    () => Analytics,
    (analytics) => analytics.shortLink,
  )
  analytics!: Analytics[];
}