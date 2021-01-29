import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmComponent } from './confirm/confirm.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { TranslocoModule } from '@ngneat/transloco';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { ResendActivationMailComponent } from './resend-activation-mail/resend-activation-mail.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ConfirmComponent,
    ResendActivationMailComponent,
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    UiComponentsModule,
  ],
})
export class AuthModule {}
