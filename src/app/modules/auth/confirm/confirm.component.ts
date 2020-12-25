import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  confirmationToken: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.confirmationToken = param.get('confirmationToken');
    })
  }

  async onConfirm() {
    await this.authService.confirmSignUp(this.confirmationToken).then((res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    })
  }
}
