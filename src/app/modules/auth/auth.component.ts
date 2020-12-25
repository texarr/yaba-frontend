import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [MessageService]
})
export class AuthComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.authService.handleRequestCallbackMessage('', '', '');
  }

}
