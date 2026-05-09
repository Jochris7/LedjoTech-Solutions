/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories_service')
export class CategorieService {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 80 })
  nom!: string;

  @Column({ type: 'bigint', name: 'chiffre_affaires' })
  chiffreAffaires!: number;

  @Column({ length: 9 })
  couleur!: string;

  @Column({ type: 'smallint', default: 0 })
  ordre!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
