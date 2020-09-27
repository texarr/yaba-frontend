import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmComponent } from './confirm/confirm.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ConfirmComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    AmplifyUIAngularModule,
    InputTextModule,
    ButtonModule,
  ]
})
export class AuthModule { }
