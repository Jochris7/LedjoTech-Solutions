import { Injectable } from '@nestjs/common';
import { CreateCategoriesServiceDto } from './dto/create-categories_service.dto';
import { UpdateCategoriesServiceDto } from './dto/update-categories_service.dto';

@Injectable()
export class CategoriesServiceService {
  create(createCategoriesServiceDto: CreateCategoriesServiceDto) {
    return 'This action adds a new categoriesService';
  }

  findAll() {
    return `This action returns all categoriesService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesService`;
  }

  update(id: number, updateCategoriesServiceDto: UpdateCategoriesServiceDto) {
    return `This action updates a #${id} categoriesService`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesService`;
  }
}
