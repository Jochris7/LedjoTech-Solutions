import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesServiceDto } from './create-categories_service.dto';

export class UpdateCategoriesServiceDto extends PartialType(CreateCategoriesServiceDto) {}
