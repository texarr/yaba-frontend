import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  msgs: Message[] = [];

  constructor() {
  }

  handleRequestCallbackMessage(severity: string, message: string, detail: string, clearPrevious = true): void {
    if (clearPrevious) {
      this.msgs = [];
    }

    this.msgs.push({
      severity: severity,
      summary: message,
      detail: detail
    })
  }

  handleCallbackErrorMessage(err: HttpErrorResponse): void {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: `Http Error: Status: ${err.status.toString()}`,
      detail: `${err.error.message}`,
    })
  }

  clearMessages(timeout?: number): void {
    if (timeout) {
      setTimeout(() => {
         this.msgs = [];
      }, timeout)
      return;
    }
    this.msgs = [];
  }
}
