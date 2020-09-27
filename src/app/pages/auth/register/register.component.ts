import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../API.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public newUserForm: FormGroup;

  constructor(
    private api: APIService,
    private fb: FormBuilder,
    private authService: AuthService,
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

  async signUp(user: User): Promise<void> {
    await this.authService.signUp(user).then((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    })

    // const newUserDto = {
    //   username: user.username,
    //   email: user.email,
    //   password: user.password
    // }
    //
    // this.api.CreateUser(newUserDto).then(event => {
    //   console.log(event);
    //   console.log('user created');
    //   this.newUserForm.reset();
    // }).catch((e: HttpErrorResponse) => {
    //   console.log(e);
    // })
  }
}
