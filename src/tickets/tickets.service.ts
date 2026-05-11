/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepo.create({
      titre: dto.titre,
      description: dto.description,
      statut: dto.statut,
      priorite: dto.priorite,
      semaineLabel: dto.semaineLabel,
      technicienAssigne: dto.technicienAssigne ?? null,
      client: dto.clientId ? { id: dto.clientId } : null,
    });
    return this.ticketRepo.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({
      relations: ['client'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!ticket) throw new NotFoundException(`Ticket ${id} introuvable`);
    return ticket;
  }

  async update(id: string, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);
    Object.assign(ticket, {
      ...dto,
      client:
        dto.clientId !== undefined
          ? dto.clientId
            ? ({ id: dto.clientId } as any)
            : null
          : ticket.client,
    });
    return this.ticketRepo.save(ticket);
  }

  async remove(id: string): Promise<{ message: string }> {
    const ticket = await this.findOne(id);
    await this.ticketRepo.remove(ticket);
    return { message: `Ticket ${id} supprimé` };
  }

  async statsByWeek(): Promise<
    { semaineLabel: string; total: number; resolus: number }[]
  > {
    const rows = await this.ticketRepo
      .createQueryBuilder('t')
      .select('t.semaine_label', 'semaineLabel')
      .addSelect('COUNT(*)', 'total')
      .addSelect(`COUNT(CASE WHEN t.statut = 'resolu' THEN 1 END)`, 'resolus')
      .groupBy('t.semaine_label')
      .orderBy('t.semaine_label', 'ASC')
      .getRawMany<{ semaineLabel: string; total: string; resolus: string }>();

    return rows.map((r) => ({
      semaineLabel: r.semaineLabel,
      total: Number(r.total),
      resolus: Number(r.resolus),
    }));
  }
}
