import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BudgetInterface } from './models/budget.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetsApiService {
  apiBase = environment.apiBase;

  constructor(private http: HttpClient) {
  }

  getBudgets(): Observable<BudgetInterface[]> {
    return this.http.get<BudgetInterface[]>(`${this.apiBase}/dashboard/budgets`);
  }

  addBudget(name: string, year: number): Observable<BudgetInterface> {
    return this.http.post<BudgetInterface>(`${this.apiBase}/dashboard/budgets`, {
      name,
      year
    })
  }

  removeBudget(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/dashboard/budgets/${id}`)
  }
}
