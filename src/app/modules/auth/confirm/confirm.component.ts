import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslocoService } from '@ngneat/transloco';
import { UserConfirmationCallBack } from '../models/user.model';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  confirmationToken: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private transloco: TranslocoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (param) => {
      this.confirmationToken = param.get('confirmationToken');
      await this.confirmAccount();
    });
  }

  async confirmAccount() {
    await this.authService.confirmSignUp(this.confirmationToken).then(
      (res: UserConfirmationCallBack) => {
        this.authService.handleRequestCallbackMessage(
          'success',
          this.transloco.translate('messages.message.accountConfirmed.title'),
          this.transloco.translate('messages.message.accountConfirmed.message')
        );
      },
      (err: HttpErrorResponse) => {
        this.authService.handleCallbackErrorMessage(err);
      }
    );

    setTimeout(() => {
      this.router.navigateByUrl('/auth/login');
      this.authService.clearMessages();
    }, 2000);
  }
}
