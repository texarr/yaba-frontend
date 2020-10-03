import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../../../API.service';
import { AuthService } from '../auth-service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Router } from '@angular/router';

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
    try {
      await this.authService.signIn(user.email, user.password)
    } catch (e) {
      console.log(e);
    }
  }
}
