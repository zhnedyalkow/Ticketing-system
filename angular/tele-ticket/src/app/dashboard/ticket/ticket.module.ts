import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';

import { TicketPageComponent } from './ticket-page/ticket-page.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketComponent } from './ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';


@NgModule({
  declarations: [
      CreateTicketComponent,
      TicketPageComponent,
      TicketListComponent,
      TicketComponent
],
  imports: [
    CommonModule,
    TicketRoutingModule
  ],
})
export class TicketModule { }
