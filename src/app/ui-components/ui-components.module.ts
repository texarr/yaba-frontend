import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
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
  ]
})
export class UiComponentsModule { }
