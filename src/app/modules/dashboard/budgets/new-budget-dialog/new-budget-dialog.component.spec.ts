import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBudgetDialogComponent } from './new-budget-dialog.component';

describe('NewBudgetDialogComponent', () => {
  let component: NewBudgetDialogComponent;
  let fixture: ComponentFixture<NewBudgetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBudgetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBudgetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
