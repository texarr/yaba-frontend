import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendActivationMailComponent } from './resend-activation-mail.component';

describe('ResendActivationMailComponent', () => {
  let component: ResendActivationMailComponent;
  let fixture: ComponentFixture<ResendActivationMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResendActivationMailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendActivationMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
