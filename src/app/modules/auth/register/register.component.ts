import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../auth-service';
import { UserRegisterPayload } from '../models/user.model';
import { TranslocoService } from '@ngneat/transloco';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public newUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private transloco: TranslocoService
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, RxwebValidators.email()]],
      emailConfirm: ['', [Validators.required, RxwebValidators.email(), RxwebValidators.compare({fieldName: 'email'})]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required, RxwebValidators.compare({fieldName: 'password'})]]
    })
  }

  async signUp(user: UserRegisterPayload): Promise<void> {
    await this.authService.signUp(user).then((res) => {
      this.authService.handleRequestCallbackMessage(
        'success',
        this.transloco.translate('messages.message.registrationSuccess'),
        this.transloco.translate('messages.message.registrationAuthorizationInfo')
      )

      this.newUserForm.disable();
    }, (err: HttpErrorResponse) => {
      this.authService.handleCallbackErrorMessage(err);
    })
  }
}
