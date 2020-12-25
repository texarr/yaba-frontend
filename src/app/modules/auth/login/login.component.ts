import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { UserLoginCallback, UserLoginPayload } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private transloco: TranslocoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, RxwebValidators.email()]],
      password: ['', [Validators.required]]
    })
  }

  async onLogin(user) {
    const userLoginPayload: UserLoginPayload = {
      email: user.email,
      password: user.password
    }

    await this.authService.signIn(userLoginPayload).then(
      (res: UserLoginCallback) => {
        this.authService.clearMessages();
        this.authService.handleRequestCallbackMessage(
          'success',
          this.transloco.translate('messages.message.loginSuccess'),
          this.transloco.translate('messages.message.welcome') + res.user.name
        )

        localStorage.setItem('yabaAuth', res.accessToken);

        setTimeout(() => {
          this.authService.clearMessages();
          this.router.navigateByUrl('/dashboard')
        }, 2000);
      }, (err: HttpErrorResponse) => {
        this.authService.handleRequestCallbackMessage(
          'error',
          `Http Error: Status: ${err.status.toString()}`,
          `${err.message}`,
          true
        )
      }
    )
  }
}
