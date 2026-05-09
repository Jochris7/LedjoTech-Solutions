import { Module } from '@nestjs/common';
import { CategoriesServiceService } from './categories_service.service';
import { CategoriesServiceController } from './categories_service.controller';

@Module({
  controllers: [CategoriesServiceController],
  providers: [CategoriesServiceService],
})
export class CategoriesServiceModule {}
