/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

export enum ClientStatut {
  ACTIF = 'Actif',
  RENOUVELLEMENT = 'Renouvellement',
  INACTIF = 'Inactif',
}

export enum ClientSecteur {
  BANQUE = 'Banque',
  TELECOMS = 'Télécoms',
  ASSURANCE = 'Assurance',
  DISTRIBUTION = 'Distribution',
  FINTECH = 'Fintech',
  EDUCATION = 'Éducation',
  AUTRE = 'Autre',
}

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 120 })
  nom!: string;

  @Column({ type: 'enum', enum: ClientSecteur })
  secteur!: ClientSecteur;

  @Column({ length: 100 })
  contrat!: string;

  @Column({ type: 'bigint', name: 'mrr' })
  mrr!: number;

  @Column({ type: 'enum', enum: ClientStatut, default: ClientStatut.ACTIF })
  statut!: ClientStatut;

  @Column({ length: 10, default: '0%' })
  tendance!: string;

  @OneToMany(() => Transaction, (t: Transaction) => t.client)
  transactions!: Transaction[];

  @OneToMany(() => Ticket, (t: Ticket) => t.client)
  tickets!: Ticket[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
