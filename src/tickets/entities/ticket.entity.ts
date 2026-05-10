import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';

export enum TicketStatut {
  OUVERT = 'ouvert',
  EN_COURS = 'en_cours',
  RESOLU = 'resolu',
  FERME = 'ferme',
}

export enum TicketPriorite {
  FAIBLE = 'faible',
  NORMALE = 'normale',
  HAUTE = 'haute',
  CRITIQUE = 'critique',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 200 })
  titre!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'enum', enum: TicketStatut, default: TicketStatut.OUVERT })
  statut!: TicketStatut;

  @Column({
    type: 'enum',
    enum: TicketPriorite,
    default: TicketPriorite.NORMALE,
  })
  priorite!: TicketPriorite;

  @Column({ length: 10, name: 'semaine_label' })
  semaineLabel!: string;

  @ManyToOne(() => Client, (c: Client) => c.tickets, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'client_id' })
  client!: Client | null;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
    name: 'technicien_assigne',
  })
  technicienAssigne!: string | null;

  @Column({ type: 'timestamp', nullable: true, name: 'resolu_le' })
  resoluLe!: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
