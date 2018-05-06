import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TeamModule } from './team/team.module';

import { DashboardComponent } from './dashboard.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

import { DashboardService } from './shared/services/dashboard.service';
import { TicketService } from './shared/services/ticket.service';
import { TeamService } from './shared/services/team.service';

import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { TeamTicketsResolver } from './shared/resolvers/team-tickets.resolver';
import { DatepickerValidationService } from './components/create-ticket/validator/datepicker-validator-service';
import { AddTeammemberComponent } from './components/add-teammember/add-teammember.component';
import { ReusableModalComponent } from '../components/reusable-modal/reusable-modal.component';
import { UserService } from './shared/services/user.service';
import { TeamMembersResolver } from './shared/resolvers/team-members.resolver';
import { HomeComponent } from './components/home/home.component';
import { HomeService } from './shared/services/home.service';
import { NotificationBoxComponent } from './components/notification-box/notification-box.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserMenuComponent,
    CreateTeamComponent,
    CreateTicketComponent,
    AddTeammemberComponent,
    NavbarComponent,
    HomeComponent,
    NotificationBoxComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    // FormsModule
  ],
  providers: [
    DashboardService,
    TicketService,
    TeamService,
    UserService,
    HomeService,
    DatepickerValidationService,
    TeamTicketsResolver,
    TeamMembersResolver
  ],
  entryComponents: [
    CreateTeamComponent,
    CreateTicketComponent,
    AddTeammemberComponent,
  ],
})
export class DashboardModule { }
