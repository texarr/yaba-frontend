import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../API.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../auth-service';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, RxwebValidators.email()]],
      password: ['', [Validators.required, RxwebValidators.compare({fieldName: 'passwordRepeat'})]],
      passwordRepeat: ['', [Validators.required, RxwebValidators.compare({fieldName: 'password'})]]
    })
  }

  async signUp(user: User): Promise<void> {
    await this.authService.signUp(user).then((res) => {
      console.log(res);
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
