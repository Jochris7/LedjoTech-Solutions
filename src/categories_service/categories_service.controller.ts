import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CategoriesServiceService } from './categories_service.service';
import { CreateCategoriesServiceDto } from './dto/create-categories_service.dto';
import { UpdateCategoriesServiceDto } from './dto/update-categories_service.dto';

@Controller('categories-service')
export class CategoriesServiceController {
  constructor(
    private readonly categoriesServiceService: CategoriesServiceService,
  ) {}

  @Post()
  create(@Body() dto: CreateCategoriesServiceDto) {
    return this.categoriesServiceService.create(dto);
  }

  @Get()
  findAll() {
    return this.categoriesServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesServiceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoriesServiceDto,
  ) {
    return this.categoriesServiceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesServiceService.remove(id);
  }
}
