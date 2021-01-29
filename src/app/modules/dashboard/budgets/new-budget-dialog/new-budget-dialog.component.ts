import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import * as moment from 'moment';

@Component({
  selector: 'app-new-budget-dialog',
  templateUrl: './new-budget-dialog.component.html',
  styleUrls: ['./new-budget-dialog.component.scss'],
})
export class NewBudgetDialogComponent implements OnInit {
  newBudgetForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const year = moment().format('YYYY').toString();
    this.newBudgetForm = this.fb.group({
      budgetName: this.fb.control('', [Validators.required]),
      budgetYear: this.fb.control(Number(year), [
        Validators.required,
        RxwebValidators.numeric({
          allowDecimal: false,
          acceptValue: 1,
        }),
      ]),
    });
  }

  submit(): void {
    this.ref.close(this.newBudgetForm.value);
  }
}
