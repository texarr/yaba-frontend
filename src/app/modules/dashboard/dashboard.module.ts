import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { MessagesModule } from 'primeng/messages';
import { NewCategoryDialogComponent } from './categories/new-category-dialog/new-category-dialog.component';
import { NewBudgetDialogComponent } from './budgets/new-budget-dialog/new-budget-dialog.component';
import { BudgetPlanningComponent } from './budgets/budget-planning/budget-planning.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BudgetsComponent,
    CategoriesComponent,
    NewCategoryDialogComponent,
    NewBudgetDialogComponent,
    BudgetPlanningComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UiComponentsModule,
    PanelMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MessagesModule,
  ],
  providers: [DashboardService],
  entryComponents: [
    NewCategoryDialogComponent,
    NewBudgetDialogComponent
  ]
})
export class DashboardModule { }
