import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TeamModule } from './team/team.module';

import { DashboardComponent } from './dashboard.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

import { DashboardService } from './shared/services/dashboard.service';
import { TicketService } from './shared/services/ticket.service';
import { TeamService } from './shared/services/team.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { TeamNameResolver } from './shared/resolvers/team-name.resolver';

@NgModule({
  declarations: [
    DashboardComponent,
    UserMenuComponent,
    CreateTeamComponent,
    CreateTicketComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,

    DashboardRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DashboardService,
    TicketService,
    TeamService,
    TeamNameResolver
  ],
  entryComponents: [
    CreateTeamComponent,
    CreateTicketComponent
  ],
})
export class DashboardModule { }
