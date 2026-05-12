import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatMensuelle } from './entities/stats_mensuelle.entity';
import { CreateStatsMensuelleDto } from './dto/create-stats_mensuelle.dto';
import { UpdateStatsMensuelleDto } from './dto/update-stats_mensuelle.dto';

@Injectable()
export class StatsMensuellesService {
  constructor(
    @InjectRepository(StatMensuelle)
    private readonly statRepo: Repository<StatMensuelle>,
  ) {}

  async create(dto: CreateStatsMensuelleDto): Promise<StatMensuelle> {
    const exists = await this.statRepo.findOne({
      where: { annee: dto.annee, mois: dto.mois },
    });
    if (exists) {
      throw new ConflictException(
        `Stats déjà existantes pour ${dto.moisLabel} ${dto.annee}`,
      );
    }

    const stat = this.statRepo.create({
      annee: dto.annee,
      mois: dto.mois,
      moisLabel: dto.moisLabel,
      revenus: dto.revenus,
      depenses: dto.depenses,
      benefice: dto.benefice,
    });
    return this.statRepo.save(stat);
  }

  findAll(): Promise<StatMensuelle[]> {
    return this.statRepo.find({
      order: { annee: 'DESC', mois: 'DESC' },
    });
  }

  async findOne(id: string): Promise<StatMensuelle> {
    const stat = await this.statRepo.findOne({ where: { id } });
    if (!stat) throw new NotFoundException(`StatMensuelle ${id} introuvable`);
    return stat;
  }

  async update(
    id: string,
    dto: UpdateStatsMensuelleDto,
  ): Promise<StatMensuelle> {
    const stat = await this.findOne(id);

    const newAnnee = dto.annee ?? stat.annee;
    const newMois = dto.mois ?? stat.mois;
    if (newAnnee !== stat.annee || newMois !== stat.mois) {
      const conflict = await this.statRepo.findOne({
        where: { annee: newAnnee, mois: newMois },
      });
      if (conflict && conflict.id !== id) {
        throw new ConflictException(
          `Stats déjà existantes pour ${newMois}/${newAnnee}`,
        );
      }
    }

    Object.assign(stat, dto);
    return this.statRepo.save(stat);
  }

  async remove(id: string): Promise<{ message: string }> {
    const stat = await this.findOne(id);
    await this.statRepo.remove(stat);
    return { message: `StatMensuelle ${id} supprimée` };
  }

  async findByYear(annee: number): Promise<StatMensuelle[]> {
    return this.statRepo.find({
      where: { annee },
      order: { mois: 'ASC' },
    });
  }
}
