import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMonthSummaryComponent } from './budget-month-summary.component';

describe('BudgetMonthSummaryComponent', () => {
  let component: BudgetMonthSummaryComponent;
  let fixture: ComponentFixture<BudgetMonthSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetMonthSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetMonthSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
