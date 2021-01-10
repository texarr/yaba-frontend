import { BudgetStatusEnum } from './budget-status.enum';

export interface BudgetInterface {
  budgetId: string;
  name: string;
  status: BudgetStatusEnum;
  year: number;
  isActive: boolean;
}
