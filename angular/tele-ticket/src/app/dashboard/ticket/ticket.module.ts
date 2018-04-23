import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketPageComponent } from './ticket-page/ticket-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateTicketComponent, TicketPageComponent]
})
export class TicketModule { }
