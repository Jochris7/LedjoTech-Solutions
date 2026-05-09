import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TicketsModule } from './tickets/tickets.module';
import { StatsMensuellesModule } from './stats_mensuelles/stats_mensuelles.module';
import { CategoriesServiceModule } from './categories_service/categories_service.module';

@Module({
  imports: [ClientsModule, TransactionsModule, TicketsModule, StatsMensuellesModule, CategoriesServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
