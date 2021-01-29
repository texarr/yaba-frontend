import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesApiService } from '../../categories/categories-api.service';
import { take, takeUntil } from 'rxjs/operators';
import { CategoryTemplateOptionInterface } from '../../categories/models/category-template-option.interface';
import { BudgetsApiService } from '../budgets-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetInterface, BudgetPlanSummary } from '../models/budget.interface';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { CategoryTemplateInterface } from '../../categories/models/category-template.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from '../../dashboard.service';
import { ConfirmationService } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-budget-planning',
  templateUrl: './budget-planning.component.html',
  styleUrls: ['./budget-planning.component.scss'],
  providers: [CategoriesApiService, BudgetsApiService, ConfirmationService],
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
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private transloco: TranslocoService
  ) {}

  ngOnInit(): void {
    this.getTemplates();
    this.route.paramMap.subscribe((param) => {
      const budgetId = param.get('id');
      if (budgetId) {
        this.getBudget(budgetId);
      }
    });
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
    this.budgetsApiService
      .getBudgetDetails(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res: BudgetInterface) => {
        this.budget = res;
      });
  }

  getTemplates(): void {
    this.categoriesApiService
      .getTemplates()
      .pipe(take(1))
      .subscribe(
        (res: string[]) => {
          this.templates = res.map((template) => {
            return {
              name: template.replace(/-/g, ' '),
              value: template,
            };
          });
        },
        (err: HttpErrorResponse) => {
          if (err.status === 409) {
            this.handleTemplatesError(err);
          }
        }
      );
  }

  handleTemplatesError(err): void {
    this.dashboardService.handleCallbackErrorMessage(err);
    setTimeout(() => {
      this.dashboardService.clearMessages();
      this.router.navigate(['/dashboard/categories']);
    }, 2000);
  }

  assignTemplate(event): void {
    // TODO: possibility to change template if budget has 'new' status
    this.confirmationService.confirm({
      message: this.transloco.translate('budget.plan.assign.confirm.message'),
      accept: () => {
        this.categoriesApiService
          .getTemplateCategories(event.value)
          .pipe(take(1))
          .subscribe((res) => {
            this.prepareCategories(res, this.budget);
            this.saveBudgetWithCategories();
          });
      },
      reject: () => {
        this.selectedCategory = null;
      },
    });
  }

  prepareCategories(
    template: CategoryTemplateInterface,
    budget: BudgetInterface
  ): any {
    budget.months = [];

    for (let i = 0; i < 12; i++) {
      budget.months.push({
        monthNo: i + 1,
        categories: template,
        monthSummary: new BudgetPlanSummary(),
      });
    }
  }

  saveBudgetWithCategories() {
    console.log(this.budget);
  }
}
