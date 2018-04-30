import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';

import { TicketPageComponent } from './ticket-page/ticket-page.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketComponent } from './ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketInfoComponent } from './ticket-page/ticket-info/ticket-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../shared/services/ticket.service';

@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CreateTicketComponent,
    TicketPageComponent,
    TicketListComponent,
    TicketComponent,
    TicketInfoComponent,
  ],
  providers: [
    TicketService,
  ],
})
export class TicketModule { }
