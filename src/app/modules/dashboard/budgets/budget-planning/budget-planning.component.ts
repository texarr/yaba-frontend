import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesApiService } from '../../categories/categories-api.service';
import { take, takeUntil } from 'rxjs/operators';
import { CategoryTemplateOptionInterface } from '../../categories/models/category-template-option.interface';
import { BudgetsApiService } from '../budgets-api.service';
import { ActivatedRoute } from '@angular/router';
import { BudgetInterface } from '../models/budget.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrls: ['./budget-planning.component.scss'],
  providers: [CategoriesApiService, BudgetsApiService]
})
export class BudgetPlanningComponent implements OnInit, OnDestroy {
  selectedMonth: Date;
  selectedCategory: any;
  templates: CategoryTemplateOptionInterface[];
  destroyed$ = new Subject();
  budget: BudgetInterface;

  constructor(
    private categoriesApiService: CategoriesApiService,
    private budgetsApiService: BudgetsApiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getTemplates();
    this.route.paramMap.subscribe((param) => {
      const budgetId = param.get('id');
      if (budgetId) {
        this.getBudget(budgetId);
      }
    })
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  selectMonth(value: any): void {
    console.log(value);
  }

  getBudget(id: string): void {
    this.budgetsApiService.getBudgetDetails(id).pipe(takeUntil(this.destroyed$)).subscribe(
      (res: BudgetInterface) => {
        this.budget = res;
      }
    )
  }

  getTemplates(): void {
    this.categoriesApiService.getTemplates().pipe(take(1)).subscribe(
      (res: string[]) => {
        this.templates = res.map(template => {
          return {
            name: template.replace(/-/g, ' '),
            value: template
          }
        });
      }
    )
  }

  assignCategory(event): void {
    console.log(event.value);
  }
}
