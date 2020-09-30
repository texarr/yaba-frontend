import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BudgetPlanComponent } from './budget-plan/budget-plan.component';
import { BudgetProgressComponent } from './budget-progress/budget-progress.component';
import { TranslocoModule } from '@ngneat/transloco';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [DashboardComponent, BudgetPlanComponent, BudgetProgressComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslocoModule,
    UiComponentsModule,
    PanelMenuModule
  ]
})
export class DashboardModule { }
