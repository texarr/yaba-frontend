import { CategoryInterface } from './category.interface';

export interface CategoryTemplateInterface {
  templateId?: string;
  templateName: string;
  incomes: CategoryInterface[];
  outcomes: CategoryInterface[];
}
