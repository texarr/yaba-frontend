import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../../API.service';
import { AuthService } from '../auth-service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private api: APIService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, RxwebValidators.email()]],
      password: ['', [Validators.required]]
    })
  }

  async onLogin(user) {
    await this.authService.signIn(user.email, user.password).then((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    })
  }
}
