import { Component, OnDestroy, OnInit } from '@angular/core';
import { BudgetInterface } from './models/budget.interface';
import { BudgetStatusEnum } from './models/budget-status.enum';
import { TranslocoService } from '@ngneat/transloco';
import { take } from 'rxjs/operators';
import { ActionTypeEnum } from './models/action-type.enum';
import { BudgetsApiService } from './budgets-api.service';
import { Subject } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { NewBudgetDialogComponent } from './new-budget-dialog/new-budget-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface StatusOption {
  value: BudgetStatusEnum;
  label: string;
}

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
  providers: [BudgetsApiService, DialogService]
})

export class BudgetsComponent implements OnInit, OnDestroy {
  budgets: BudgetInterface[];
  loading: boolean;
  statuses: StatusOption[];
  destroyed: Subject<void>;

  constructor(
    private transloco: TranslocoService,
    private budgetsApiService: BudgetsApiService,
    private router: Router,
    public dialogService: DialogService
  ) { }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.destroyed = new Subject();

    this.transloco.selectTranslate('budget.statuses.new').pipe(take(1)).subscribe(
      () => {
        this.statuses = [
          {
            label: this.transloco.translate(`budget.statuses.${BudgetStatusEnum.new}`),
            value: BudgetStatusEnum.new
          },
          {
            label: this.transloco.translate(`budget.statuses.${BudgetStatusEnum.finished}`),
            value: BudgetStatusEnum.finished
          },
          {
            label: this.transloco.translate(`budget.statuses.${BudgetStatusEnum.inProgress}`),
            value: BudgetStatusEnum.inProgress
          },
          {
            label: this.transloco.translate(`budget.statuses.${BudgetStatusEnum.planned}`),
            value: BudgetStatusEnum.planned
          }
        ]
      }
    )

    this.getBudgets();
  }

  handleBudgetAction(budget: BudgetInterface, actionType: ActionTypeEnum | string): void {
    switch (actionType) {
      case ActionTypeEnum.plan: {
        this.router.navigateByUrl(`dashboard/budget/plan/${budget.budgetId}`);
        break;
      }
      case ActionTypeEnum.realise: {
        break;
      }
      case ActionTypeEnum.summary: {
        break;
      }
      case ActionTypeEnum.delete: {
        this.handleBudgetDelete(budget);
        break;
      }
    }
  }

  getBudgets(): void {
    this.budgetsApiService.getBudgets().pipe(take(1)).subscribe(
      (res: BudgetInterface[]) => {
        this.budgets = res;
      }, (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.budgets = [];
        }
      }
    )
  }

  handleBudgetAdd(): void {
    const ref = this.dialogService.open(NewBudgetDialogComponent, {});

    ref.onClose.pipe(take(1)).subscribe((data) => {
      if (data) {
        this.budgetsApiService.addBudget(data.budgetName, data.budgetYear)
          .pipe(take(1))
          .subscribe(() => this.getBudgets())
      }
    })
  }

  handleBudgetDelete(budget: BudgetInterface): void {
    console.log(budget);
    this.budgetsApiService.removeBudget(budget.budgetId).pipe(take(1)).subscribe(
      () => this.getBudgets()
    )
  }
}
