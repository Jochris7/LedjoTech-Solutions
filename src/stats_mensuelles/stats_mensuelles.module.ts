import { Module } from '@nestjs/common';
import { StatsMensuellesService } from './stats_mensuelles.service';
import { StatsMensuellesController } from './stats_mensuelles.controller';

@Module({
  controllers: [StatsMensuellesController],
  providers: [StatsMensuellesService],
})
export class StatsMensuellesModule {}
