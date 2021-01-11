import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-month-summary',
  templateUrl: './budget-month-summary.component.html',
  styleUrls: ['./budget-month-summary.component.scss']
})
export class BudgetMonthSummaryComponent implements OnInit {
  @Input() header: string;
  @Input() input1Label: string;
  @Input() input1Value: number;

  @Input() input2Label: string;
  @Input() input2Value: number;

  @Input() input3Label: string;
  @Input() input3Value: number;

  disabled = true;

  constructor() { }

  ngOnInit(): void {
  }

}
