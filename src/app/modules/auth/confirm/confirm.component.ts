import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  confirmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.confirmForm = this.fb.group({
      username: ['', [Validators.required, RxwebValidators.email()]],
      code: ['', Validators.required]
    })
  }

  async onConfirm(confirmation) {
    await this.authService.confirmSignUp(confirmation.username, confirmation.code).then((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    })
  }
}
