import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[];
  destroyed = new Subject();

  constructor(
    private transloco: TranslocoService
  ) { }

  ngOnInit(): void {
    this.transloco.selectTranslate('nav.categories').pipe(takeUntil(this.destroyed)).subscribe(() => {
      this.menuItems = [
        {
          label: this.transloco.translate('nav.categories'),
          icon: 'pi pi-inbox',
          routerLink: 'categories'
        },
        {
          label: this.transloco.translate('nav.plan'),
          icon: 'pi pi-calendar',
          routerLink: 'plan'
        },
        {
          label: this.transloco.translate('nav.progress'),
          icon: 'pi pi-chart-line',
          routerLink: 'progress'
        }
      ]
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
