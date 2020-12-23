import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBase = environment.apiBase;

  constructor(
    private http: HttpClient
  ) {}

  async signUp(userDto: User): Promise<void> {
    return this.http.post<void>(`${this.apiBase}/auth/register`, userDto).toPromise();
  }

  async confirmSignUp(username: string, code: string) {
    try {
      // todo: signup confirmation
    } catch (error) {
      return error;
    }
  }

  async signIn(username: string, password: string) {
    // todo: sign in connection
  }

  async resendConfirmationCode(username: string) {
    // todo: resend confirmation
  }

  async signOut() {
    // todo: sign out
  }
}
