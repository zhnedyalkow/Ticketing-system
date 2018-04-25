import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketPageComponent } from './ticket-page/ticket-page.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketComponent } from './ticket.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateTicketComponent, TicketPageComponent, TicketListComponent, TicketComponent]
})
export class TicketModule { }
