import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '250px',
          opacity: 1,
          left: '*',
        })
      ),
      state(
        'closed',
        style({
          width: '0',
          opacity: 0,
          left: '-250px',
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[];
  destroyed = new Subject();
  isOpen = false;

  constructor(
    private transloco: TranslocoService,
    private router: Router,
    public dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.transloco
      .selectTranslate('nav.categories')
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.menuItems = [
          {
            label: this.transloco.translate('nav.categories'),
            icon: 'pi pi-inbox',
            routerLink: 'categories',
          },
          {
            label: this.transloco.translate('nav.budgets'),
            icon: 'pi pi-calendar',
            routerLink: 'budgets',
          },
        ];
      });
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  async handleLogout() {
    localStorage.removeItem('yabaAuth');
    await this.router.navigateByUrl('');
  }
}
