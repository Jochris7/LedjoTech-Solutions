/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEnum,
  IsString,
  IsUUID,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { TicketStatut, TicketPriorite } from '../entities/ticket.entity';

export class CreateTicketDto {
  @IsString()
  @MaxLength(200)
  titre!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TicketStatut)
  @IsOptional()
  statut?: TicketStatut;

  @IsEnum(TicketPriorite)
  @IsOptional()
  priorite?: TicketPriorite;

  @IsString()
  @MaxLength(10)
  semaineLabel!: string;

  @IsUUID()
  @IsOptional()
  clientId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  technicienAssigne?: string;
}
