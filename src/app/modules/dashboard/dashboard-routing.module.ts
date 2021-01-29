import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { BudgetPlanningComponent } from './budgets/budget-planning/budget-planning.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'budgets',
        component: BudgetsComponent,
      },
      {
        path: 'budget/plan/:id',
        component: BudgetPlanningComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
