/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEnum,
  IsString,
  IsNumber,
  IsUUID,
  IsDateString,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsString()
  @MaxLength(20)
  reference!: string;

  @IsString()
  @MaxLength(120)
  tiers!: string;

  @IsString()
  @MaxLength(255)
  description!: string;

  @IsNumber()
  montant!: number;

  @IsEnum(TransactionType)
  type!: TransactionType;

  @IsDateString()
  dateTransaction!: string;

  @IsUUID()
  @IsOptional()
  clientId?: string;
}
