import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoModule } from '@ngneat/transloco';
import { ValidationMessageComponent } from './forms/validation-message/validation-message.component';


@NgModule({
  declarations: [
    ValidationMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    InputTextModule,
    TranslocoModule
  ],
  exports: [
    ValidationMessageComponent
  ]
})
export class UiComponentsModule { }
