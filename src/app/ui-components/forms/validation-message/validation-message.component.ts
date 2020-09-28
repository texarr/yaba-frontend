import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {
  @Input() control: AbstractControl;

  constructor() { }

  getErrors() {
    const errors: ValidationErrors = this.control.errors;
    if (errors !== null) {
      return Object.keys(errors).map(keyError => {
        return {
          keyError,
          value: errors[keyError]
        }
      })
    }
    return null;
  }
}
