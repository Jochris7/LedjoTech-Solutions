/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity('stats_mensuelles')
@Unique(['annee', 'mois'])
export class StatMensuelle {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'smallint' })
  annee!: number;

  @Column({ type: 'smallint' })
  mois!: number;

  @Column({ length: 5, name: 'mois_label' })
  moisLabel!: string;

  @Column({ type: 'bigint' })
  revenus!: number;

  @Column({ type: 'bigint', name: 'depenses' })
  depenses!: number;

  @Column({ type: 'bigint' })
  benefice!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
