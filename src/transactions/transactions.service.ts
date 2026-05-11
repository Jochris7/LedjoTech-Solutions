/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const exists = await this.transactionRepo.findOne({
      where: { reference: dto.reference },
    });
    if (exists) {
      throw new ConflictException(`Référence "${dto.reference}" déjà utilisée`);
    }

    const transaction = this.transactionRepo.create({
      reference: dto.reference,
      tiers: dto.tiers,
      description: dto.description,
      montant: dto.montant,
      type: dto.type,
      dateTransaction: new Date(dto.dateTransaction),
      client: dto.clientId ? { id: dto.clientId } : null,
    });
    return this.transactionRepo.save(transaction);
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionRepo.find({
      relations: ['client'],
      order: { dateTransaction: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepo.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!transaction)
      throw new NotFoundException(`Transaction ${id} introuvable`);
    return transaction;
  }

  async update(id: string, dto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.findOne(id);

    if (dto.reference && dto.reference !== transaction.reference) {
      const exists = await this.transactionRepo.findOne({
        where: { reference: dto.reference },
      });
      if (exists) {
        throw new ConflictException(
          `Référence "${dto.reference}" déjà utilisée`,
        );
      }
    }

    Object.assign(transaction, {
      ...dto,
      dateTransaction: dto.dateTransaction
        ? new Date(dto.dateTransaction)
        : transaction.dateTransaction,
      client:
        dto.clientId !== undefined
          ? dto.clientId
            ? ({ id: dto.clientId } as any)
            : null
          : transaction.client,
    });

    return this.transactionRepo.save(transaction);
  }

  async remove(id: string): Promise<{ message: string }> {
    const transaction = await this.findOne(id);
    await this.transactionRepo.remove(transaction);
    return { message: `Transaction ${id} supprimée` };
  }

  async findRecent(limit: number): Promise<Transaction[]> {
    return this.transactionRepo.find({
      relations: ['client'],
      order: { dateTransaction: 'DESC' },
      take: limit,
    });
  }
}
