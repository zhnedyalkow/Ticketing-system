import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TeamModule } from './team/team.module';
import { TestModule } from './test/test.module';

import { DashboardComponent } from './dashboard.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

import { DashboardService } from './shared/services/dashboard.service';
import { TicketService } from './shared/services/ticket.service';
import { TeamService } from './shared/services/team.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,

    DashboardRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    DashboardService,
    TicketService,
    TeamService
  ],
})
export class DashboardModule { }
