import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  async signUp(userDto: User) {
    try {
      const { user } = await Auth.signUp({
        username: userDto.username,
        password: userDto.password,
        attributes: {
          email: userDto.email
        }
      });
      return user;
    } catch (error) {
      console.log('error signin up: ', error);
    }
  }

  async confirmSignUp(username: string, code: string) {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log('error confirming sign up: ', error);
    }
  }

  async signIn(username: string, password: string) {
    try {
      const user = await Auth.signIn(username, password);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  async resendConfirmationCode(username: string) {
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (error) {
      console.log('error resending code: ', error);
    }
  }

  async signOut() {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
