import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  async signUp(userDto: User) {
    try {
      const { user } = await Auth.signUp({
        username: userDto.email,
        password: userDto.password,
        attributes: {
          name: userDto.name
        }
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  async confirmSignUp(username: string, code: string) {
    try {
      await Auth.confirmSignUp(username, code);
      return confirm;
    } catch (error) {
      return error;
    }
  }

  async signIn(username: string, password: string) {
    try {
      return await Auth.signIn(username, password).then((res) => {
        localStorage.setItem('yabaAuth', JSON.stringify(res.signInUserSession))
      });
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
      await Auth.signOut({ global: true });
    } catch (error) {
      return error;
    }
  }
}
