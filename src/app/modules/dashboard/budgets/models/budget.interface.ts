import { BudgetStatusEnum } from './budget-status.enum';
import { CategoryTemplateInterface } from '../../categories/models/category-template.interface';

export interface BudgetInterface {
  budgetId: string;
  name: string;
  status: BudgetStatusEnum;
  year: number;
  isActive: boolean;
  months?: BudgetMonthInterface[];
}

export interface BudgetMonthInterface {
  monthNo: number;
  categories: CategoryTemplateInterface;
  monthSummary: BudgetPlanSummary
}

export class BudgetPlanSummary {
  incomes: number;
  expenses: number;
  deficitOrSurplus: number;

  constructor(data?: BudgetPlanSummary) {
    this.incomes = data ? data.incomes : 0;
    this.expenses = data ? data.expenses : 0;
    this.deficitOrSurplus = data ? data.incomes - data.expenses : 0;
  }
}
