import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Client } from 'src/clients/entities/client.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { StatMensuelle } from 'src/stats_mensuelles/entities/stats_mensuelle.entity';
import { CategorieService } from 'src/categories_service/entities/categories_service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client,
      Transaction,
      Ticket,
      StatMensuelle,
      CategorieService,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
