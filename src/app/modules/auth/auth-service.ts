import { Injectable } from '@angular/core';
import {
  UserConfirmationCallBack, UserLoginCallback,
  UserLoginPayload,
  UserRegisterCallback,
  UserRegisterPayload
} from './models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MailerConfirmationPayload } from './models/mailer-confirmation-payload.interface';
import { Message, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBase = environment.apiBase;
  msgs: Message[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  async signUp(userDto: UserRegisterPayload): Promise<UserRegisterCallback> {
    return this.http.post<UserRegisterCallback>(`${this.apiBase}/auth/register`, userDto).toPromise();
  }

  async confirmSignUp(confirmationToken: string): Promise<UserConfirmationCallBack> {
    return this.http.get<UserConfirmationCallBack>(`${this.apiBase}/auth/confirm/${confirmationToken}`).toPromise();
  }

  async signIn(userPayload: UserLoginPayload): Promise<UserLoginCallback> {
    return this.http.post<UserLoginCallback>(`${this.apiBase}/auth/login`, userPayload).toPromise();
  }

  async resendEmail(mailerPayload: MailerConfirmationPayload): Promise<void> {
    return this.http.post<void>(`${this.apiBase}/mailer/resendEmail`, mailerPayload).toPromise();
  }

  async signOut() {
    // todo: sign out
  }

  handleRequestCallbackMessage(severity: string, message: string, detail: string, clearPrevious = true): void {
    if (clearPrevious) {
      this.msgs = [];
    }

    this.msgs.push({
      severity: severity,
      summary: message,
      detail: detail
    })
  }

  handleCallbackErrorMessage(err: HttpErrorResponse): void {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: `Http Error: Status: ${err.status.toString()}`,
      detail: `${err.error.message}`,
    })
  }

  clearMessages(): void {
    this.msgs = [];
  }
}
