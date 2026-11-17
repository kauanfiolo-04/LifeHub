/**
 * Seed de finanças do LifeHub.
 * Local: backend/src/database/seed/seed.ts
 *
 * Uso:
 *   npm run seed                      -> popula só o que estiver faltando
 *   npm run seed -- --reset           -> apaga os dados financeiros do usuário demo e recria
 *   npm run seed -- --reset --confirm -> idem, autorizando o reset em banco remoto (Neon)
 *
 * package.json:
 *   "seed": "ts-node -r tsconfig-paths/register src/database/seed/seed.ts"
 */
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { DataSource, EntityManager, Not } from 'typeorm';

import { AppModule } from '../../app/app.module';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { Account } from '../../finance/accounts/entities/account.entity';
import { Category } from '../../finance/categories/entities/category.entity';
import { Transaction } from '../../finance/transactions/entities/transaction.entity';
import { TransactionType } from '../../finance/transactions/enum/transaction-type.enum';

import { accountsData, INITIAL_BALANCE_TITLE } from './data/accounts.data';
import { categoriesData } from './data/categories.data';
import { buildTransactions, getPeriodStart } from './data/transactions.data';
import { Task } from '../../tasks/entities/task.entity';
import { Note } from '../../notes/entities/note.entity';
import { buildTasks } from './data/tasks.data';
import { notesData } from './data/notes.data';

// ---------------------------------------------------------------------------
// Configuração
// ---------------------------------------------------------------------------

const MONTHS = 3;

const DEMO_USER = {
  email: process.env.SEED_DEMO_EMAIL ?? 'email@example.com',
  name: 'Demo LifeHub',
  password: process.env.SEED_DEMO_PASSWORD ?? '0123456' // mínimo 5 caracteres (SignupDTO)
};

const args = new Set(process.argv.slice(2));
const FLAGS = {
  reset: args.has('--reset'),
  confirm: args.has('--confirm')
};

// ---------------------------------------------------------------------------
// Etapas
// ---------------------------------------------------------------------------

/** Garante que o usuário demo existe e devolve ele. */
async function ensureDemoUser(app: INestApplicationContext): Promise<User> {
  // strict: false porque os providers vivem dentro de módulos (AuthModule/UsersModule)
  const usersService = app.get(UsersService, { strict: false });
  const authService = app.get(AuthService, { strict: false });

  const existingUser = await usersService.findByEmail(DEMO_USER.email);

  if (existingUser) return existingUser;

  const { user } = await authService.signup({ ...DEMO_USER });

  return await usersService.findOne(user.id);
}

/** Apaga transações, contas e categorias SÓ do usuário informado. */
async function resetDemoData(manager: EntityManager, userId: string): Promise<void> {
  // Ordem por causa das FKs: transações -> contas e categorias.
  // (delete não aceita critério em relação aninhada, por isso find + delete por ids)
  const transactions = await manager.find(Transaction, {
    where: { account: { user: { id: userId } } },
    select: { id: true }
  });

  if (transactions.length)
    await manager.delete(
      Transaction,
      transactions.map(t => t.id)
    );

  const accounts = await manager.find(Account, { where: { user: { id: userId } }, select: { id: true } });

  if (accounts.length)
    await manager.delete(
      Account,
      accounts.map(a => a.id)
    );

  const categories = await manager.find(Category, { where: { user: { id: userId } }, select: { id: true } });

  if (categories.length)
    await manager.delete(
      Category,
      categories.map(c => c.id)
    );

  const tasks = await manager.find(Task, { where: { user: { id: userId } }, select: { id: true } });

  if (tasks.length)
    await manager.delete(
      Task,
      tasks.map(t => t.id)
    );

  const notes = await manager.find(Note, { where: { user: { id: userId } }, select: { id: true } });

  if (notes.length)
    await manager.delete(
      Note,
      notes.map(n => n.id)
    );
}

/** Cria (ou reaproveita) as contas. Retorna mapa nome -> Account. */
async function seedAccounts(manager: EntityManager, user: User, periodStart: Date): Promise<Map<string, Account>> {
  const result = new Map<string, Account>();

  for (const data of accountsData) {
    let account = await manager.findOne(Account, { where: { name: data.name, user: { id: user.id } } });

    if (!account) {
      account = await manager.save(manager.create(Account, { name: data.name, type: data.type, user }));

      // Igual ao AccountsService.create: saldo inicial vira uma transação de entrada.
      if (data.initialBalance && data.initialBalance > 0) {
        await manager.save(
          manager.create(Transaction, {
            title: INITIAL_BALANCE_TITLE,
            amount: data.initialBalance,
            type: TransactionType.INCOME,
            account,
            date: periodStart
          })
        );
      }
    }

    result.set(data.name, account);
  }

  return result;
}

/** Cria (ou reaproveita) as categorias. Retorna mapa nome -> Category. */
async function seedCategories(manager: EntityManager, user: User): Promise<Map<string, Category>> {
  const result = new Map<string, Category>();

  for (const data of categoriesData) {
    let category = await manager.findOne(Category, { where: { name: data.name, user: { id: user.id } } });

    if (!category) {
      category = await manager.save(manager.create(Category, { name: data.name, color: data.color, user }));
    }

    result.set(data.name, category);
  }

  return result;
}

/** Creates the demo tasks that don't exist yet (matched by title). Returns how many were created. */
async function seedTasks(manager: EntityManager, user: User): Promise<number> {
  const existing = await manager.find(Task, { where: { user: { id: user.id } }, select: { title: true } });
  const existingTitles = new Set(existing.map(t => t.title));

  const entities = buildTasks(new Date())
    .filter(task => !existingTitles.has(task.title))
    .map(task => manager.create(Task, { ...task, user }));

  await manager.save(entities, { chunk: 100 });

  return entities.length;
}

/** Creates the demo notes that don't exist yet (matched by title). Returns how many were created. */
async function seedNotes(manager: EntityManager, user: User): Promise<number> {
  const existing = await manager.find(Note, { where: { user: { id: user.id } }, select: { title: true } });
  const existingTitles = new Set(existing.map(n => n.title));

  const entities = notesData
    .filter(note => !existingTitles.has(note.title))
    .map(note => manager.create(Note, { ...note, user }));

  await manager.save(entities, { chunk: 100 });

  return entities.length;
}

/** Gera e grava as transações dos últimos meses. Retorna quantas foram criadas. */
async function seedTransactions(
  manager: EntityManager,
  accounts: Map<string, Account>,
  categories: Map<string, Category>
): Promise<number> {
  // Evita duplicar: pula contas que já têm alguma transação além do saldo inicial.
  const accountsToSkip = new Set<string>();

  for (const [name, account] of accounts) {
    const existing = await manager.count(Transaction, {
      where: { account: { id: account.id }, title: Not(INITIAL_BALANCE_TITLE) }
    });

    if (existing > 0) accountsToSkip.add(name);
  }

  const items = buildTransactions({ months: MONTHS, today: new Date() }).filter(
    item => !accountsToSkip.has(item.accountName)
  );

  const entities = items.map(item => {
    const account = accounts.get(item.accountName);

    if (!account) throw new Error(`Seed: conta "${item.accountName}" não existe em accountsData.`);

    const category = item.categoryName ? categories.get(item.categoryName) : undefined;

    if (item.categoryName && !category) {
      throw new Error(`Seed: categoria "${item.categoryName}" não existe em categoriesData.`);
    }

    return manager.create(Transaction, {
      title: item.title,
      description: item.description,
      type: item.type,
      amount: item.amount,
      account,
      category,
      date: item.date
    });
  });

  await manager.save(entities, { chunk: 100 });

  return entities.length;
}

// ---------------------------------------------------------------------------
// Execução
// ---------------------------------------------------------------------------

/** Host sem o sufixo "-pooler", para a conexão direta e a pooled do Neon contarem como o mesmo endpoint. */
const normalizeHost = (host: string): string => host.replace('-pooler', '');

/**
 * Mostra em qual banco o seed vai rodar e exige --confirm para --reset
 * em qualquer host que não esteja em SEED_SAFE_HOSTS (ex.: o endpoint da branch dev do Neon).
 *
 * .env local: SEED_SAFE_HOSTS=ep-xxxx-dev.sa-east-1.aws.neon.tech  (vários hosts separados por vírgula)
 */
function assertSafeToRun(): void {
  const rawUrl = process.env.DATABASE_URL;

  if (!rawUrl) throw new Error('DATABASE_URL não definida.');

  const { hostname, pathname } = new URL(rawUrl); // não imprime usuário nem senha

  const safeHosts = (process.env.SEED_SAFE_HOSTS ?? '')
    .split(',')
    .map(host => normalizeHost(host.trim()))
    .filter(Boolean);

  const isSafe = safeHosts.includes(normalizeHost(hostname));

  console.log(`Banco: ${hostname}${pathname} (${isSafe ? 'seguro para reset' : 'NÃO marcado como seguro'})`);

  if (!isSafe && FLAGS.reset && !FLAGS.confirm) {
    throw new Error('--reset em banco não listado em SEED_SAFE_HOSTS exige --confirm. Confira o host acima.');
  }
}

async function main(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn'] });

  try {
    const ds = app.get(DataSource);

    assertSafeToRun();

    const user = await ensureDemoUser(app);
    console.log(`Usuário demo: ${user.email}`);

    const periodStart = getPeriodStart(MONTHS, new Date());

    // Tudo em uma transação: se algo falhar no meio, nada fica pela metade.
    const summary = await ds.transaction(async manager => {
      if (FLAGS.reset) {
        await resetDemoData(manager, user.id);
        console.log('Dados financeiros do usuário demo apagados.');
      }

      const accounts = await seedAccounts(manager, user, periodStart);
      const categories = await seedCategories(manager, user);
      const transactions = await seedTransactions(manager, accounts, categories);
      const tasks = await seedTasks(manager, user);
      const notes = await seedNotes(manager, user);

      return { accounts: accounts.size, categories: categories.size, transactions, tasks, notes };
    });

    console.log(
      `Seed concluído: ${summary.accounts} contas, ${summary.categories} categorias, ` +
        `${summary.transactions} transações, ${summary.tasks} tasks e ${summary.notes} notes novas.`
    );
  } finally {
    await app.close();
  }
}

main().catch(error => {
  console.error('Seed falhou:', error);
  process.exit(1);
});
