import { TaskPriority } from '../../../tasks/enum/task-priority.enum';
import { TaskStatus } from '../../../tasks/enum/task-status.enum';

export interface TaskSeedItem {
  title: string; // max 100
  description?: string; // max 500
  status: TaskStatus;
  priority: TaskPriority;
  /** Days from today. Negative = past, null = no due date. */
  dueInDays: number | null;
}

const tasksData: TaskSeedItem[] = [
  // Completed
  {
    title: 'Set up monthly budget',
    description: 'Define spending limits for groceries, transport, leisure and subscriptions.',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.HIGH,
    dueInDays: -12
  },
  {
    title: 'Renew gym membership',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.LOW,
    dueInDays: -8
  },
  {
    title: 'Book dentist appointment',
    description: 'Routine check-up and cleaning.',
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.MEDIUM,
    dueInDays: -5
  },

  // In progress
  {
    title: 'Finish quarterly financial review',
    description: 'Compare income vs. expenses for the last 3 months and flag unusual spending.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    dueInDays: 2
  },
  {
    title: 'Read "Clean Architecture"',
    description: 'Currently on the chapters about boundaries and components.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    dueInDays: 14
  },
  {
    title: 'Plan weekend hiking trip',
    description: 'Pick a trail, check the weather forecast and prepare the gear checklist.',
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.LOW,
    dueInDays: 6
  },

  // Pending
  {
    title: 'Pay credit card bill',
    description: 'Due date is approaching. Pay the full amount to avoid interest.',
    status: TaskStatus.PENDING,
    priority: TaskPriority.HIGH,
    dueInDays: 1
  },
  {
    title: 'Schedule car maintenance',
    description: 'Oil change and tire rotation.',
    status: TaskStatus.PENDING,
    priority: TaskPriority.MEDIUM,
    dueInDays: 10
  },
  {
    title: 'Review and cancel unused subscriptions',
    status: TaskStatus.PENDING,
    priority: TaskPriority.MEDIUM,
    dueInDays: 7
  },
  {
    title: 'Organize digital documents',
    description: 'Scan receipts and archive tax-related files by year.',
    status: TaskStatus.PENDING,
    priority: TaskPriority.LOW,
    dueInDays: 21
  },
  {
    title: 'Learn a new language every day',
    description: 'Keep a 15-minute daily practice streak.',
    status: TaskStatus.PENDING,
    priority: TaskPriority.LOW,
    dueInDays: null
  },

  // Cancelled
  {
    title: 'Buy a standing desk',
    description: 'Postponed indefinitely, the current setup works fine.',
    status: TaskStatus.CANCELLED,
    priority: TaskPriority.LOW,
    dueInDays: -3
  }
];

export function buildTasks(today: Date) {
  return tasksData.map(({ dueInDays, ...task }) => {
    let dueDate: Date | undefined;

    if (dueInDays !== null) {
      dueDate = new Date(today);
      dueDate.setDate(dueDate.getDate() + dueInDays);
      dueDate.setHours(18, 0, 0, 0);
    }

    return { ...task, dueDate };
  });
}
