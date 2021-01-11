import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoModule } from '@ngneat/transloco';
import { ValidationMessageComponent } from './forms/validation-message/validation-message.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { BudgetMonthSummaryComponent } from './budget/budget-month-summary/budget-month-summary.component';


@NgModule({
  declarations: [
    ValidationMessageComponent,
    BudgetMonthSummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    InputTextModule,
    TranslocoModule,
    DropdownModule,
    ButtonModule,
    DynamicDialogModule,
    TableModule,
    TooltipModule,
    InputNumberModule,
    CalendarModule,
  ],
  exports: [
    ValidationMessageComponent,
    BudgetMonthSummaryComponent,
    TranslocoModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    TableModule,
    TooltipModule,
    InputNumberModule,
    CalendarModule,
  ]
})
export class UiComponentsModule { }
