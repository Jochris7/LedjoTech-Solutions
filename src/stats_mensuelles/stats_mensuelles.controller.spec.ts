import { Test, TestingModule } from '@nestjs/testing';
import { StatsMensuellesController } from './stats_mensuelles.controller';
import { StatsMensuellesService } from './stats_mensuelles.service';

describe('StatsMensuellesController', () => {
  let controller: StatsMensuellesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsMensuellesController],
      providers: [StatsMensuellesService],
    }).compile();

    controller = module.get<StatsMensuellesController>(StatsMensuellesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
