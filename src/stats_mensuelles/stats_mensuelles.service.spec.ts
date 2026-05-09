import { Test, TestingModule } from '@nestjs/testing';
import { StatsMensuellesService } from './stats_mensuelles.service';

describe('StatsMensuellesService', () => {
  let service: StatsMensuellesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatsMensuellesService],
    }).compile();

    service = module.get<StatsMensuellesService>(StatsMensuellesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
