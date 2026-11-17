/* eslint-disable prettier/prettier */
import { TransactionType } from '../../../finance/transactions/enum/transaction-type.enum';

export type SeedTransaction = {
  title: string;
  description?: string;
  type: TransactionType;
  amount: number;
  accountName: string;
  categoryName?: string;
  date: Date;
};

type AmountRange = number | [number, number];

/** Acontece uma vez por mês, em um dia fixo. */
type FixedTemplate = {
  title: string;
  description?: string;
  type: TransactionType;
  amount: AmountRange;
  accountName: string;
  categoryName: string;
  day: number;
};

/** Acontece um número variável de vezes por mês, em dias aleatórios. */
type VariableTemplate = {
  titles: string[];
  type: TransactionType;
  amount: [number, number];
  accountName: string;
  categoryName: string;
  times: [number, number];
};

const { INCOME, EXPENSE } = TransactionType;

// Títulos com 5+ caracteres (mesma regra do CreateTransactionDTO).
const FIXED: FixedTemplate[] = [
  { title: 'Monthly salary', type: INCOME, amount: 6200, accountName: 'Itaú', categoryName: 'Salary', day: 5 },
  { title: 'Apartment rent', type: EXPENSE, amount: 1650, accountName: 'Itaú', categoryName: 'Home', day: 10 },
  { title: 'Fiber internet', type: EXPENSE, amount: 119.9, accountName: 'Itaú', categoryName: 'Home', day: 12 },
  { title: 'Electricity bill', type: EXPENSE, amount: [140, 230], accountName: 'Itaú', categoryName: 'Home', day: 15 },
  { title: 'Gym membership', type: EXPENSE, amount: 99.9, accountName: 'Itaú', categoryName: 'Health', day: 8 },
  { title: 'Netflix subscription', type: EXPENSE, amount: 55.9, accountName: 'Nubank', categoryName: 'Subscriptions', day: 7 },
  { title: 'Spotify subscription', type: EXPENSE, amount: 21.9, accountName: 'Nubank', categoryName: 'Subscriptions', day: 9 },
  { title: 'Mobile phone plan', type: EXPENSE, amount: 59.9, accountName: 'Nubank', categoryName: 'Subscriptions', day: 20 },
  { title: 'Savings yield', type: INCOME, amount: [40, 70], accountName: 'Savings', categoryName: 'Investments', day: 28 }
];

const VARIABLE: VariableTemplate[] = [
  { titles: ['Grocery shopping', 'Farmers market produce'], type: EXPENSE, amount: [120, 420], accountName: 'Nubank', categoryName: 'Market', times: [4, 5] },
  { titles: ['Food delivery', 'Restaurant lunch'], type: EXPENSE, amount: [35, 110], accountName: 'Nubank', categoryName: 'Alimentation', times: [3, 5] },
  { titles: ['Uber ride'], type: EXPENSE, amount: [14, 55], accountName: 'Nubank', categoryName: 'Transport', times: [4, 8] },
  { titles: ['Gas station fuel'], type: EXPENSE, amount: [180, 260], accountName: 'Nubank', categoryName: 'Transport', times: [1, 2] },
  { titles: ['Movie ticket', 'Drinks with friends', 'Concert ticket'], type: EXPENSE, amount: [40, 220], accountName: 'Nubank', categoryName: 'Entertainment', times: [2, 3] },
  { titles: ['Pharmacy purchase', 'Medical appointment'], type: EXPENSE, amount: [30, 250], accountName: 'Nubank', categoryName: 'Health', times: [1, 2] },
  { titles: ['Online course', 'Technical book'], type: EXPENSE, amount: [50, 200], accountName: 'Nubank', categoryName: 'Education', times: [0, 1] },
  { titles: ['Bakery coffee', 'Street market'], type: EXPENSE, amount: [12, 60], accountName: 'Wallet', categoryName: 'Alimentation', times: [3, 5] },
  { titles: ['Freelance project', 'Freelance maintenance'], type: INCOME, amount: [400, 1800], accountName: 'Itaú', categoryName: 'Freelance', times: [0, 1] }
];

/** Gerador pseudoaleatório com semente: mesma semente, mesmos dados. */
function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round2 = (value: number): number => Math.round(value * 100) / 100;

/** Primeiro dia do mês mais antigo do período (usado no saldo inicial das contas). */
export function getPeriodStart(months: number, today: Date): Date {
  return new Date(today.getFullYear(), today.getMonth() - (months - 1), 1);
}

type BuildOptions = {
  months: number;
  today: Date;
  seed?: number;
};

/**
 * Gera as transações dos últimos `months` meses (o mês atual vai só até hoje,
 * sem datas futuras), ordenadas da mais antiga para a mais recente.
 */
export function buildTransactions({ months, today, seed = 42 }: BuildOptions): SeedTransaction[] {
  const random = mulberry32(seed);

  const between = (min: number, max: number) => min + random() * (max - min);
  const intBetween = (min: number, max: number) => Math.floor(between(min, max + 1));
  const pick = <T>(list: T[]): T => list[intBetween(0, list.length - 1)];
  const money = (range: AmountRange) => (Array.isArray(range) ? round2(between(range[0], range[1])) : range);

  const result: SeedTransaction[] = [];

  for (let offset = months - 1; offset >= 0; offset--) {
    const year = new Date(today.getFullYear(), today.getMonth() - offset, 1).getFullYear();
    const month = new Date(today.getFullYear(), today.getMonth() - offset, 1).getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lastDay = offset === 0 ? today.getDate() : daysInMonth;

    const buildDate = (day: number, hour: number, minute: number) => {
      const date = new Date(year, month, day, hour, minute);
      return date > today ? new Date(today) : date;
    };

    for (const template of FIXED) {
      const day = Math.min(template.day, daysInMonth);

      if (day > lastDay) continue;

      result.push({
        title: template.title,
        description: template.description,
        type: template.type,
        amount: money(template.amount),
        accountName: template.accountName,
        categoryName: template.categoryName,
        date: buildDate(day, 9, 0)
      });
    }

    for (const template of VARIABLE) {
      const count = intBetween(template.times[0], template.times[1]);

      for (let i = 0; i < count; i++) {
        result.push({
          title: pick(template.titles),
          type: template.type,
          amount: money(template.amount),
          accountName: template.accountName,
          categoryName: template.categoryName,
          date: buildDate(intBetween(1, lastDay), intBetween(8, 21), intBetween(0, 59))
        });
      }
    }
  }

  return result.sort((a, b) => a.date.getTime() - b.date.getTime());
}
