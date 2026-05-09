import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesServiceController } from './categories_service.controller';
import { CategoriesServiceService } from './categories_service.service';

describe('CategoriesServiceController', () => {
  let controller: CategoriesServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesServiceController],
      providers: [CategoriesServiceService],
    }).compile();

    controller = module.get<CategoriesServiceController>(CategoriesServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
