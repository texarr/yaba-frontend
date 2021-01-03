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
    TranslocoModule,
    DropdownModule,
    ButtonModule,
    DynamicDialogModule
  ],
  exports: [
    ValidationMessageComponent,
    TranslocoModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule
  ]
})
export class UiComponentsModule { }
