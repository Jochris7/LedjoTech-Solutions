import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TicketsModule } from './tickets/tickets.module';
import { StatsMensuellesModule } from './stats_mensuelles/stats_mensuelles.module';
import { CategoriesServiceModule } from './categories_service/categories_service.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    ClientsModule,
    TransactionsModule,
    TicketsModule,
    StatsMensuellesModule,
    CategoriesServiceModule,
    DashboardModule,
  ],
})
export class AppModule {}
