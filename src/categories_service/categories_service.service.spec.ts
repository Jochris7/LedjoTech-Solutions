import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesServiceService } from './categories_service.service';

describe('CategoriesServiceService', () => {
  let service: CategoriesServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesServiceService],
    }).compile();

    service = module.get<CategoriesServiceService>(CategoriesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
