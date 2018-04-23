import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamPageComponent } from './team/team-page/team-page.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { TicketPageComponent } from './ticket/ticket-page/ticket-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { DashboardService } from './services/dashboard.service';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent,
    TeamComponent,
    TeamListComponent,
    TeamPageComponent,
    CreateTicketComponent,
    TicketPageComponent,
    UserMenuComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [
    DashboardService
  ],
})
export class DashboardModule { }
