/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const existing = await this.clientRepository.findOne({
        where: { nom: createClientDto.nom },
      });

      if (existing) {
        throw new ConflictException(
          `Un client avec le nom "${createClientDto.nom}" existe déjà.`,
        );
      }

      const client = this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(client);
    } catch (err) {
      if (err?.status) throw err;
      throw new InternalServerErrorException(
        'Erreur lors de la création du client.',
      );
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      return await this.clientRepository.find({
        order: { mrr: 'DESC' },
      });
    } catch {
      throw new InternalServerErrorException(
        'Erreur lors de la récupération des clients.',
      );
    }
  }

  async findOne(id: string): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne({
        where: { id },
        relations: ['transactions', 'tickets'],
      });

      if (!client) {
        throw new NotFoundException(`Client #${id} introuvable.`);
      }

      return client;
    } catch (err) {
      if (err?.status) throw err;
      throw new InternalServerErrorException(
        'Erreur lors de la récupération du client.',
      );
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    try {
      const client = await this.findOne(id);
      if (updateClientDto.nom && updateClientDto.nom !== client.nom) {
        const nameConflict = await this.clientRepository.findOne({
          where: { nom: updateClientDto.nom },
        });
        if (nameConflict) {
          throw new ConflictException(
            `Un client avec le nom "${updateClientDto.nom}" existe déjà.`,
          );
        }
      }

      Object.assign(client, updateClientDto);
      return await this.clientRepository.save(client);
    } catch (err) {
      if (err?.status) throw err;
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour du client.',
      );
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const client = await this.findOne(id);
      await this.clientRepository.remove(client);
      return { message: `Client "${client.nom}" supprimé avec succès.` };
    } catch (err) {
      if (err?.status) throw err;
      throw new InternalServerErrorException(
        'Erreur lors de la suppression du client.',
      );
    }
  }

  async findTopByMrr(limit = 6): Promise<Client[]> {
    try {
      return await this.clientRepository.find({
        order: { mrr: 'DESC' },
        take: limit,
      });
    } catch {
      throw new InternalServerErrorException(
        'Erreur lors de la récupération du top clients.',
      );
    }
  }
}
