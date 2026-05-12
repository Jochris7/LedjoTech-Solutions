/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/clients/entities/client.entity';
import {
  Transaction,
  TransactionType,
} from 'src/transactions/entities/transaction.entity';
import { Ticket, TicketStatut } from 'src/tickets/entities/ticket.entity';
import { StatMensuelle } from 'src/stats_mensuelles/entities/stats_mensuelle.entity';
import { CategorieService } from 'src/categories_service/entities/categories_service.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Transaction)
    private readonly txRepo: Repository<Transaction>,

    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,

    @InjectRepository(StatMensuelle)
    private readonly statRepo: Repository<StatMensuelle>,

    @InjectRepository(CategorieService)
    private readonly catRepo: Repository<CategorieService>,
  ) {}

  async getKpis(annee = 2026, mois = 5) {
    const current = await this.statRepo.findOne({ where: { annee, mois } });
    const prev = await this.statRepo.findOne({
      where: { annee, mois: mois - 1 },
    });

    const delta = (curr: number, prec: number): string => {
      if (!prec) return '—';
      const pct = ((curr - prec) / prec) * 100;
      return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
    };

    const marge = current
      ? ((Number(current.benefice) / Number(current.revenus)) * 100).toFixed(1)
      : '0';
    const margePrec = prev
      ? (Number(prev.benefice) / Number(prev.revenus)) * 100
      : 0;
    const margeActuelle = current
      ? (Number(current.benefice) / Number(current.revenus)) * 100
      : 0;
    const deltaMarge = `${margeActuelle >= margePrec ? '+' : ''}${(margeActuelle - margePrec).toFixed(1)}pp`;

    return [
      {
        label: `Revenus – ${current?.moisLabel ?? ''}`,
        valeur: current ? this.formatFcfa(current.revenus) : '—',
        delta: prev
          ? delta(Number(current!.revenus), Number(prev.revenus))
          : '—',
        positif:
          current && prev
            ? Number(current.revenus) >= Number(prev.revenus)
            : true,
        icon: '₣',
      },
      {
        label: `Dépenses – ${current?.moisLabel ?? ''}`,
        valeur: current ? this.formatFcfa(current.depenses) : '—',
        delta: prev
          ? delta(Number(current!.depenses), Number(prev.depenses))
          : '—',
        positif:
          current && prev
            ? Number(current.depenses) <= Number(prev.depenses)
            : false,
        icon: '↓',
      },
      {
        label: 'Bénéfice net',
        valeur: current ? this.formatFcfa(current.benefice) : '—',
        delta: prev
          ? delta(Number(current!.benefice), Number(prev.benefice))
          : '—',
        positif:
          current && prev
            ? Number(current.benefice) >= Number(prev.benefice)
            : true,
        icon: '◈',
      },
      {
        label: 'Marge nette',
        valeur: `${marge} %`,
        delta: deltaMarge,
        positif: margeActuelle >= margePrec,
        icon: '%',
      },
    ];
  }

  async getRevenueChart(annee = 2026) {
    const stats = await this.statRepo.find({
      where: { annee },
      order: { mois: 'ASC' },
    });
    return stats.map((s) => ({
      mois: s.moisLabel,
      revenus: Number(s.revenus),
      dépenses: Number(s.depenses),
      bénéfice: Number(s.benefice),
    }));
  }

  async getCategories() {
    const cats = await this.catRepo.find({ order: { ordre: 'ASC' } });
    return cats.map((c) => ({
      nom: c.nom,
      valeur: Number(c.chiffreAffaires),
      couleur: c.couleur,
    }));
  }

  async getTopClients(limit = 6) {
    const clients = await this.clientRepo.find({
      order: { mrr: 'DESC' },
      take: limit,
    });
    return clients.map((c) => ({
      id: c.id,
      nom: c.nom,
      secteur: c.secteur,
      contrat: c.contrat,
      mrr: Number(c.mrr),
      statut: c.statut,
      tendance: c.tendance,
    }));
  }

  async getRecentTransactions(limit = 6) {
    const txs = await this.txRepo.find({
      order: { dateTransaction: 'DESC' },
      take: limit,
      relations: ['client'],
    });
    return txs.map((t) => ({
      id: t.id,
      reference: t.reference,
      tiers: t.tiers,
      description: t.description,
      montant:
        t.type === TransactionType.CREDIT
          ? Number(t.montant)
          : -Number(t.montant),
      type: t.type,
      date: t.dateTransaction,
    }));
  }

  async getTicketsParSemaine() {
    const rows = await this.ticketRepo
      .createQueryBuilder('t')
      .select('t.semaine_label', 'semaine')
      .addSelect('t.statut', 'statut')
      .addSelect('COUNT(*)', 'count')
      .groupBy('t.semaine_label')
      .addGroupBy('t.statut')
      .orderBy('t.semaine_label', 'ASC')
      .getRawMany<{ semaine: string; statut: string; count: string }>();

    const map = new Map<string, { ouverts: number; résolus: number }>();
    for (const r of rows) {
      if (!map.has(r.semaine)) map.set(r.semaine, { ouverts: 0, résolus: 0 });
      const entry = map.get(r.semaine)!;
      if (r.statut === TicketStatut.RESOLU || r.statut === TicketStatut.FERME) {
        entry.résolus += Number(r.count);
      } else {
        entry.ouverts += Number(r.count);
      }
    }

    return Array.from(map.entries()).map(([semaine, v]) => ({
      semaine,
      ouverts: v.ouverts + v.résolus,
      résolus: v.résolus,
    }));
  }

  async getTicketsStats() {
    const total = await this.ticketRepo.count();
    const resolus = await this.ticketRepo.count({
      where: [{ statut: TicketStatut.RESOLU }, { statut: TicketStatut.FERME }],
    });
    const tauxResolution =
      total > 0 ? ((resolus / total) * 100).toFixed(1) : '0';
    return { total, resolus, tauxResolution: `${tauxResolution}%` };
  }

  private formatFcfa(n: number | string): string {
    const val = Number(n);
    return val >= 1_000_000
      ? `${(val / 1_000_000).toFixed(1)} M FCFA`
      : `${(val / 1_000).toFixed(0)} K FCFA`;
  }
}
