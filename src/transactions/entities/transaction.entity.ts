/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';

export enum TransactionType {
  CREDIT = 'crédit',
  DEBIT = 'débit',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 20, name: 'reference' })
  reference!: string;

  @Column({ length: 120, name: 'tiers' })
  tiers!: string;

  @Column({ length: 255 })
  description!: string;

  @Column({ type: 'bigint' })
  montant!: number;

  @Column({ type: 'enum', enum: TransactionType })
  type!: TransactionType;

  @Column({ type: 'date', name: 'date_transaction' })
  dateTransaction!: Date;

  @ManyToOne(() => Client, (c: Client) => c.transactions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'client_id' })
  client!: Client | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
