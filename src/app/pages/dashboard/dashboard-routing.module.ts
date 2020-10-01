import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { BudgetPlanComponent } from './budget-plan/budget-plan.component';
import { BudgetProgressComponent } from './budget-progress/budget-progress.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: 'categories', component: CategoriesComponent
      },
      {
        path: 'plan', component: BudgetPlanComponent
      },
      {
        path: 'progress', component: BudgetProgressComponent
      },
      {
        path: '**', redirectTo: ''
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
