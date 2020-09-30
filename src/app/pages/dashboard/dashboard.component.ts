import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuItems: MenuItem[];

  constructor(
    private transloco: TranslocoService
  ) { }

  ngOnInit(): void {
    console.log(this.transloco.translate('nav.categories'));
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
  }
}
