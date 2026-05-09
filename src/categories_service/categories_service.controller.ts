import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesServiceService } from './categories_service.service';
import { CreateCategoriesServiceDto } from './dto/create-categories_service.dto';
import { UpdateCategoriesServiceDto } from './dto/update-categories_service.dto';

@Controller('categories-service')
export class CategoriesServiceController {
  constructor(private readonly categoriesServiceService: CategoriesServiceService) {}

  @Post()
  create(@Body() createCategoriesServiceDto: CreateCategoriesServiceDto) {
    return this.categoriesServiceService.create(createCategoriesServiceDto);
  }

  @Get()
  findAll() {
    return this.categoriesServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesServiceDto: UpdateCategoriesServiceDto) {
    return this.categoriesServiceService.update(+id, updateCategoriesServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesServiceService.remove(+id);
  }
}
