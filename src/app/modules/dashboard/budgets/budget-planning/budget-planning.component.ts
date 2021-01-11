import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesApiService } from '../../categories/categories-api.service';
import { take, takeUntil } from 'rxjs/operators';
import { CategoryTemplateOptionInterface } from '../../categories/models/category-template-option.interface';
import { BudgetsApiService } from '../budgets-api.service';
import { ActivatedRoute } from '@angular/router';
import { BudgetInterface, BudgetPlanSummary } from '../models/budget.interface';
import { Subject } from 'rxjs';
import * as moment from 'moment'
import { CategoryTemplateInterface } from '../../categories/models/category-template.interface';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrls: ['./budget-planning.component.scss'],
  providers: [CategoriesApiService, BudgetsApiService]
})
export class BudgetPlanningComponent implements OnInit, OnDestroy {
  selectedMonth: Date;
  selectedMonthNo: number;
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

  selectMonth(value): void {
    // todo: select categories template first exception
    this.selectedMonth = value;
    this.selectedMonthNo = Number(moment(value).format('M'));
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

  assignTemplate(event): void {
    this.categoriesApiService.getTemplateCategories(event.value).pipe(take(1)).subscribe(
      (res) => {
        this.prepareCategories(res, this.budget);

        console.log(res);
        console.log(this.selectedMonth);
        console.log(this.selectedMonthNo);
        console.log(this.budget);
      }
    )
  }

  prepareCategories(template: CategoryTemplateInterface, budget: BudgetInterface): any {
    for (let i = 1; i < 13; i++) {
      if (!budget.month) {
        budget.month = []
      }
      budget.month.push(
        {
          monthNo: i,
          categories: template,
          plan: new BudgetPlanSummary()
        }
      )
    }
  }
}
