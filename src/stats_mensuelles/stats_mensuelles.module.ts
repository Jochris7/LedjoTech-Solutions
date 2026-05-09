import { Module } from '@nestjs/common';
import { StatsMensuellesService } from './stats_mensuelles.service';
import { StatsMensuellesController } from './stats_mensuelles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatMensuelle } from './entities/stats_mensuelle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatMensuelle])],
  controllers: [StatsMensuellesController],
  providers: [StatsMensuellesService],
})
export class StatsMensuellesModule {}
