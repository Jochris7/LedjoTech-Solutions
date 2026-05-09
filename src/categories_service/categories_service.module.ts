import { Module } from '@nestjs/common';
import { CategoriesServiceService } from './categories_service.service';
import { CategoriesServiceController } from './categories_service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieService } from './entities/categories_service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategorieService])],
  controllers: [CategoriesServiceController],
  providers: [CategoriesServiceService],
})
export class CategoriesServiceModule {}
