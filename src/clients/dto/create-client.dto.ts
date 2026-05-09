/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';
import { ClientStatut, ClientSecteur } from '../entities/client.entity';

export class CreateClientDto {
  @IsString()
  @MaxLength(120)
  nom!: string;

  @IsEnum(ClientSecteur)
  secteur!: ClientSecteur;

  @IsString()
  @MaxLength(100)
  contrat!: string;

  @IsNumber()
  @Min(0)
  mrr!: number;

  @IsEnum(ClientStatut)
  @IsOptional()
  statut?: ClientStatut;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  tendance?: string;
}
