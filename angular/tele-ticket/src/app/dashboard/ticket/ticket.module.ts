import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';

import { TicketPageComponent } from './ticket-page/ticket-page.component';
import { TicketComponent } from './ticket.component';
import { TicketInfoComponent } from './ticket-page/ticket-info/ticket-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../shared/services/ticket.service';
import { TicketDescComponent } from './ticket-page/ticket-desc/ticket-desc.component';
import { TicketStatusBtnsComponent } from './ticket-page/ticket-status-btns/ticket-status-btns.component';
import { TicketCommentsComponent } from './ticket-page/ticket-comments/ticket-comments.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketBoxComponent } from './ticket-list/ticket-box/ticket-box.component';
import { TicketCommentsInfoComponent } from './ticket-page/ticket-comments-info/ticket-comments-info.component';

@NgModule({
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TicketPageComponent,
    TicketComponent,
    TicketInfoComponent,
    TicketDescComponent,
    TicketStatusBtnsComponent,
    TicketCommentsComponent,
    TicketListComponent,
    TicketBoxComponent,
    TicketCommentsInfoComponent,
  ],
  providers: [],
})
export class TicketModule { }
