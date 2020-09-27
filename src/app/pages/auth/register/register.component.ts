import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../API.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public newUserForm: FormGroup;

  constructor(
    private api: APIService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', [Validators.required, RxwebValidators.compare({fieldName: 'password'})]]
    })
  }

  public onCreate(user: User): void {
    const newUserDto = {
      name: user.name,
      email: user.email,
      description: user.description,
      password: user.password
    }

    this.api.CreateUser(newUserDto).then(event => {
      console.log(event);
      console.log('user created');
      this.newUserForm.reset();
    }).catch((e: HttpErrorResponse) => {
      console.log(e);
    })
  }
}
