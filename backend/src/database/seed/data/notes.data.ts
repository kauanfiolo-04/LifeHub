export interface NoteSeedItem {
  title: string; // max 100
  content: string;
  tags: string[];
  color?: string;
}

export const notesData: NoteSeedItem[] = [
  {
    title: 'Welcome to LifeHub',
    content:
      'This is a demo account. Feel free to create, edit and delete tasks, notes and transactions. Everything here is sample data.',
    tags: ['welcome', 'demo'],
    color: '#FEF3C7'
  },
  {
    title: 'Monthly budget rule',
    content:
      'Split income using 50/30/20: 50% needs, 30% wants, 20% savings and debt. Review at the end of each month and adjust the categories that went over.',
    tags: ['finance', 'budget'],
    color: '#DCFCE7'
  },
  {
    title: 'Emergency fund goal',
    content:
      'Target: 6 months of essential expenses. Automate a transfer right after payday so saving never depends on willpower.',
    tags: ['finance', 'goals'],
    color: '#DCFCE7'
  },
  {
    title: 'Grocery list',
    content: '- Rice and beans\n- Eggs\n- Oats\n- Bananas\n- Olive oil\n- Coffee\n- Chicken breast\n- Spinach',
    tags: ['shopping', 'home'],
    color: '#DBEAFE'
  },
  {
    title: 'Book ideas to read next',
    content: '1. Atomic Habits\n2. The Pragmatic Programmer\n3. Designing Data-Intensive Applications\n4. Deep Work',
    tags: ['books', 'learning'],
    color: '#EDE9FE'
  },
  {
    title: 'Weekly review checklist',
    content:
      '1. Clear the inbox\n2. Review tasks and due dates\n3. Check account balances\n4. Plan the top 3 priorities for next week',
    tags: ['productivity', 'routine'],
    color: '#FEE2E2'
  },
  {
    title: 'Trip packing list',
    content:
      'Backpack, water bottle, rain jacket, sunscreen, first-aid kit, power bank, trail snacks, comfortable hiking shoes.',
    tags: ['travel', 'outdoors'],
    color: '#DBEAFE'
  },
  {
    title: 'Side project ideas',
    content:
      'Habit tracker with streaks, expense splitter for roommates, personal dashboard with weekly insights from tasks and finances.',
    tags: ['ideas', 'dev']
    // no color on purpose, to exercise the optional field
  }
];
