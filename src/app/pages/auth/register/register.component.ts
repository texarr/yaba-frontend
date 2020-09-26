import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../API.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

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
      password: ['', Validators.required]
    })
  }

  public onCreate(user: User): void {
    this.api.CreateUser(user).then(event => {
      console.log(event);
      console.log('user created');
      this.newUserForm.reset();
    }).catch((e: HttpErrorResponse) => {
      console.log(e);
    })
  }
}
