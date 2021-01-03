import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BudgetPlanComponent } from './budget-plan/budget-plan.component';
import { BudgetProgressComponent } from './budget-progress/budget-progress.component';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { MessagesModule } from 'primeng/messages';
import { NewCategoryDialogComponent } from './categories/new-category-dialog/new-category-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BudgetPlanComponent,
    BudgetProgressComponent,
    CategoriesComponent,
    NewCategoryDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    UiComponentsModule,
    PanelMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MessagesModule
  ],
  providers: [DashboardService],
  entryComponents: [
    NewCategoryDialogComponent
  ]
})
export class DashboardModule { }
