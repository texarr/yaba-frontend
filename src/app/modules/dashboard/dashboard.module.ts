import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BudgetPlanComponent } from './budget-plan/budget-plan.component';
import { BudgetProgressComponent } from './budget-progress/budget-progress.component';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CategoriesComponent } from './categories/categories.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, BudgetPlanComponent, BudgetProgressComponent, CategoriesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UiComponentsModule,
    PanelMenuModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
