import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamPageComponent } from './team/team-page/team-page.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { TicketPageComponent } from './ticket/ticket-page/ticket-page.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe } from '@angular/common';
import { TeamModule } from './team/team.module';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardService } from './shared/services/dashboard.service';


@NgModule({
  declarations: [
    DashboardComponent,
    CreateTicketComponent,
    TicketPageComponent,
    TicketListComponent,
    UserMenuComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    TeamModule,
    DashboardRoutingModule,
    // NgbModule.forRoot(),
  ],
  providers: [
    DashboardService
  ],
})
export class DashboardModule { }
