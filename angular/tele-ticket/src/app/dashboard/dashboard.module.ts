import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TeamModule } from './team/team.module';
import { TestModule } from './test/test.module';

import { DashboardComponent } from './dashboard.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

import { DashboardService } from './shared/services/dashboard.service';

@NgModule({
  declarations: [
    DashboardComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,

    DashboardRoutingModule,
    NgbModule,
  ],
  providers: [
    DashboardService
  ],
})
export class DashboardModule { }
