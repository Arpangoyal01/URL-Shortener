import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class ShortLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  shortCode: string;

  @Column('text')
  longUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}