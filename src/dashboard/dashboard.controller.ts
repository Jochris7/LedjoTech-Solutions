import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('kpis')
  getKpis(@Query('annee') annee?: string, @Query('mois') mois?: string) {
    return this.dashboardService.getKpis(
      annee ? +annee : 2026,
      mois ? +mois : 5,
    );
  }

  @Get('revenue-chart')
  getRevenueChart(@Query('annee') annee?: string) {
    return this.dashboardService.getRevenueChart(annee ? +annee : 2026);
  }

  @Get('categories')
  getCategories() {
    return this.dashboardService.getCategories();
  }

  @Get('top-clients')
  getTopClients(@Query('limit') limit?: string) {
    return this.dashboardService.getTopClients(limit ? +limit : 6);
  }

  @Get('transactions')
  getRecentTransactions(@Query('limit') limit?: string) {
    return this.dashboardService.getRecentTransactions(limit ? +limit : 6);
  }

  @Get('tickets/semaines')
  getTicketsParSemaine() {
    return this.dashboardService.getTicketsParSemaine();
  }

  @Get('tickets/stats')
  getTicketsStats() {
    return this.dashboardService.getTicketsStats();
  }
}
