import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategorieService } from './entities/categories_service.entity';
import { CreateCategoriesServiceDto } from './dto/create-categories_service.dto';
import { UpdateCategoriesServiceDto } from './dto/update-categories_service.dto';

@Injectable()
export class CategoriesServiceService {
  constructor(
    @InjectRepository(CategorieService)
    private readonly categorieRepo: Repository<CategorieService>,
  ) {}

  async create(dto: CreateCategoriesServiceDto): Promise<CategorieService> {
    const exists = await this.categorieRepo.findOne({
      where: { nom: dto.nom },
    });
    if (exists) {
      throw new ConflictException(`Catégorie "${dto.nom}" déjà existante`);
    }

    const categorie = this.categorieRepo.create({
      nom: dto.nom,
      chiffreAffaires: dto.chiffreAffaires,
      couleur: dto.couleur,
      ordre: dto.ordre ?? 0,
    });
    return this.categorieRepo.save(categorie);
  }

  findAll(): Promise<CategorieService[]> {
    return this.categorieRepo.find({
      order: { ordre: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CategorieService> {
    const categorie = await this.categorieRepo.findOne({ where: { id } });
    if (!categorie) throw new NotFoundException(`Catégorie ${id} introuvable`);
    return categorie;
  }

  async update(
    id: string,
    dto: UpdateCategoriesServiceDto,
  ): Promise<CategorieService> {
    const categorie = await this.findOne(id);

    // Si le nom change → vérifier l'unicité
    if (dto.nom && dto.nom !== categorie.nom) {
      const conflict = await this.categorieRepo.findOne({
        where: { nom: dto.nom },
      });
      if (conflict) {
        throw new ConflictException(`Catégorie "${dto.nom}" déjà existante`);
      }
    }

    Object.assign(categorie, dto);
    return this.categorieRepo.save(categorie);
  }

  async remove(id: string): Promise<{ message: string }> {
    const categorie = await this.findOne(id);
    await this.categorieRepo.remove(categorie);
    return { message: `Catégorie ${id} supprimée` };
  }
}
