import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) {}

  async signUp(userDto: User) {
    try {
      const { user } = await Auth.signUp({
        username: userDto.email,
        password: userDto.password,
        attributes: {
          name: userDto.name
        }
      });

      this.router.navigateByUrl('/auth/confirm');
      return user;
    } catch (error) {
      return error;
    }
  }

  async confirmSignUp(username: string, code: string) {
    try {
      const confirm = await Auth.confirmSignUp(username, code);
      this.router.navigateByUrl('/');
      return confirm;
    } catch (error) {
      return error;
    }
  }

  async signIn(username: string, password: string) {
    try {
      const signIn = await Auth.signIn(username, password);
      this.router.navigateByUrl('/')
      return signIn;
    } catch (error) {
      return error;
    }
  }

  async resendConfirmationCode(username: string) {
    try {
      return await Auth.resendSignUp(username);
    } catch (error) {
      return error;
    }
  }

  async signOut() {
    try {
      return await Auth.signOut({ global: true });
    } catch (error) {
      return error;
    }
  }
}
