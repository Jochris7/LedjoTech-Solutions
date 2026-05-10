import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import {
  Client,
  ClientSecteur,
  ClientStatut,
} from 'src/clients/entities/client.entity';
import {
  Transaction,
  TransactionType,
} from 'src/transactions/entities/transaction.entity';
import {
  Ticket,
  TicketStatut,
  TicketPriorite,
} from 'src/tickets/entities/ticket.entity';
import { StatMensuelle } from 'src/stats_mensuelles/entities/stats_mensuelle.entity';
import { CategorieService } from 'src/categories_service/entities/categories_service.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    console.log(' Démarrage du seed — AbidjanTech Solutions\n');

    // ── Nettoyage : un seul TRUNCATE CASCADE règle toutes les FK d'un coup ─
    await dataSource.query(`
      TRUNCATE TABLE
        tickets,
        transactions,
        clients,
        stats_mensuelles,
        categories_service
      RESTART IDENTITY CASCADE
    `);
    console.log('🗑️   Tables vidées\n');

    const catRepo = dataSource.getRepository(CategorieService);
    const statRepo = dataSource.getRepository(StatMensuelle);
    const clientRepo = dataSource.getRepository(Client);
    const txRepo = dataSource.getRepository(Transaction);
    const ticketRepo = dataSource.getRepository(Ticket);

    // ── 1. CATÉGORIES DE SERVICE ───────────────────────────────────────────
    const categories = await catRepo.save([
      {
        nom: 'Infogérance',
        chiffreAffaires: 124000000,
        couleur: '#f97316',
        ordre: 1,
      },
      {
        nom: 'Cybersécurité',
        chiffreAffaires: 87000000,
        couleur: '#eab308',
        ordre: 2,
      },
      {
        nom: 'Licences & SaaS',
        chiffreAffaires: 63000000,
        couleur: '#22d3ee',
        ordre: 3,
      },
      {
        nom: 'Support & Helpdesk',
        chiffreAffaires: 48000000,
        couleur: '#a78bfa',
        ordre: 4,
      },
      {
        nom: 'Déploiement matériel',
        chiffreAffaires: 29000000,
        couleur: '#34d399',
        ordre: 5,
      },
    ]);
    console.log(`✅  ${categories.length} catégories insérées`);

    // ── 2. STATS MENSUELLES ────────────────────────────────────────────────
    const statsData = [
      {
        mois: 1,
        moisLabel: 'Jan',
        revenus: 18400000,
        depenses: 11200000,
        benefice: 7200000,
      },
      {
        mois: 2,
        moisLabel: 'Fév',
        revenus: 21300000,
        depenses: 12800000,
        benefice: 8500000,
      },
      {
        mois: 3,
        moisLabel: 'Mar',
        revenus: 24700000,
        depenses: 14100000,
        benefice: 10600000,
      },
      {
        mois: 4,
        moisLabel: 'Avr',
        revenus: 22900000,
        depenses: 13400000,
        benefice: 9500000,
      },
      {
        mois: 5,
        moisLabel: 'Mai',
        revenus: 42100000,
        depenses: 23200000,
        benefice: 18900000,
      },
      {
        mois: 6,
        moisLabel: 'Jun',
        revenus: 31200000,
        depenses: 17300000,
        benefice: 13900000,
      },
      {
        mois: 7,
        moisLabel: 'Jul',
        revenus: 29100000,
        depenses: 16200000,
        benefice: 12900000,
      },
      {
        mois: 8,
        moisLabel: 'Aoû',
        revenus: 26800000,
        depenses: 15100000,
        benefice: 11700000,
      },
      {
        mois: 9,
        moisLabel: 'Sep',
        revenus: 33500000,
        depenses: 18600000,
        benefice: 14900000,
      },
      {
        mois: 10,
        moisLabel: 'Oct',
        revenus: 38200000,
        depenses: 21400000,
        benefice: 16800000,
      },
      {
        mois: 11,
        moisLabel: 'Nov',
        revenus: 35900000,
        depenses: 19800000,
        benefice: 16100000,
      },
      {
        mois: 12,
        moisLabel: 'Déc',
        revenus: 42100000,
        depenses: 23200000,
        benefice: 18900000,
      },
    ];
    const stats = await statRepo.save(
      statsData.map((s) => ({ ...s, annee: 2026 })),
    );
    console.log(`✅  ${stats.length} stats mensuelles insérées`);

    // ── 3. CLIENTS ─────────────────────────────────────────────────────────
    const clients = await clientRepo.save([
      {
        nom: 'Ecobank CI',
        secteur: ClientSecteur.BANQUE,
        contrat: 'Infogérance Premium',
        mrr: 8400000,
        statut: ClientStatut.ACTIF,
        tendance: '+12%',
      },
      {
        nom: "MTN Côte d'Ivoire",
        secteur: ClientSecteur.TELECOMS,
        contrat: 'Cybersécurité 360°',
        mrr: 7100000,
        statut: ClientStatut.ACTIF,
        tendance: '+8%',
      },
      {
        nom: 'NSIA Assurances',
        secteur: ClientSecteur.ASSURANCE,
        contrat: 'Cloud & Infogérance',
        mrr: 5800000,
        statut: ClientStatut.ACTIF,
        tendance: '+5%',
      },
      {
        nom: 'Groupe CFAO',
        secteur: ClientSecteur.DISTRIBUTION,
        contrat: 'Support Gold',
        mrr: 4200000,
        statut: ClientStatut.ACTIF,
        tendance: '+3%',
      },
      {
        nom: 'Orange Money CI',
        secteur: ClientSecteur.FINTECH,
        contrat: 'Sécurité + Audit',
        mrr: 6300000,
        statut: ClientStatut.ACTIF,
        tendance: '+19%',
      },
      {
        nom: 'Université FHB',
        secteur: ClientSecteur.EDUCATION,
        contrat: 'Licences Campus',
        mrr: 2100000,
        statut: ClientStatut.RENOUVELLEMENT,
        tendance: '-2%',
      },
    ]);
    console.log(`✅  ${clients.length} clients insérés`);

    // ── 4. TRANSACTIONS ────────────────────────────────────────────────────
    const [ecobank, mtn, , , orangeMoney] = clients;

    await txRepo.save([
      {
        reference: 'TXN-2891',
        tiers: 'Ecobank CI',
        description: 'Facture infogérance – Mai 2026',
        montant: 8400000,
        type: TransactionType.CREDIT,
        dateTransaction: new Date('2026-05-08'),
        client: ecobank,
      },
      {
        reference: 'TXN-2890',
        tiers: 'Fournisseur Dell',
        description: 'Achat serveurs rack R750',
        montant: 4200000,
        type: TransactionType.DEBIT,
        dateTransaction: new Date('2026-05-07'),
        client: null,
      },
      {
        reference: 'TXN-2889',
        tiers: 'Orange Money CI',
        description: 'Prestation audit sécurité',
        montant: 3150000,
        type: TransactionType.CREDIT,
        dateTransaction: new Date('2026-05-06'),
        client: orangeMoney,
      },
      {
        reference: 'TXN-2888',
        tiers: 'Microsoft EMEA',
        description: 'Renouvellement licences M365',
        montant: 1890000,
        type: TransactionType.DEBIT,
        dateTransaction: new Date('2026-05-05'),
        client: null,
      },
      {
        reference: 'TXN-2887',
        tiers: 'MTN CI',
        description: 'Monitoring réseau – Avr 2026',
        montant: 7100000,
        type: TransactionType.CREDIT,
        dateTransaction: new Date('2026-05-04'),
        client: mtn,
      },
      {
        reference: 'TXN-2886',
        tiers: 'Salaires – Équipe technique',
        description: 'Paie mai 2026 (14 techniciens)',
        montant: 6300000,
        type: TransactionType.DEBIT,
        dateTransaction: new Date('2026-05-02'),
        client: null,
      },
    ]);
    console.log('✅  Transactions insérées');

    // ── 5. TICKETS ─────────────────────────────────────────────────────────
    const semaines = [
      { label: 'S1 Avr', ouverts: 34, resolus: 29 },
      { label: 'S2 Avr', ouverts: 41, resolus: 38 },
      { label: 'S3 Avr', ouverts: 28, resolus: 27 },
      { label: 'S4 Avr', ouverts: 52, resolus: 44 },
      { label: 'S1 Mai', ouverts: 38, resolus: 35 },
      { label: 'S2 Mai', ouverts: 45, resolus: 41 },
    ];

    const tickets: Partial<Ticket>[] = [];

    for (const sem of semaines) {
      for (let i = 0; i < sem.resolus; i++) {
        tickets.push({
          titre: `Incident réseau client #${Math.floor(Math.random() * 9000) + 1000}`,
          description: 'Interruption de service signalée par le client.',
          statut: TicketStatut.RESOLU,
          priorite:
            i % 5 === 0 ? TicketPriorite.CRITIQUE : TicketPriorite.NORMALE,
          semaineLabel: sem.label,
          client: clients[i % clients.length],
          technicienAssigne: `Technicien ${(i % 4) + 1}`,
          resoluLe: new Date(),
        });
      }

      const nonResolus = sem.ouverts - sem.resolus;
      for (let i = 0; i < nonResolus; i++) {
        tickets.push({
          titre: `Demande support #${Math.floor(Math.random() * 9000) + 1000}`,
          description: 'En attente de traitement.',
          statut: TicketStatut.OUVERT,
          priorite: i % 3 === 0 ? TicketPriorite.HAUTE : TicketPriorite.NORMALE,
          semaineLabel: sem.label,
          client: clients[i % clients.length],
          technicienAssigne: undefined,
          resoluLe: undefined,
        });
      }
    }

    await ticketRepo.save(tickets);
    console.log(`✅  ${tickets.length} tickets insérés`);

    console.log('\n🎉  Seed terminé avec succès — AbidjanTech Solutions');
  } catch (err) {
    console.error('❌  Erreur pendant le seed :', err);
    process.exit(1);
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
