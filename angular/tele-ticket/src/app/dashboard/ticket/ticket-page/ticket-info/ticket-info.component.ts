import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../../../models/tickets/ticket';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss']
})
export class TicketInfoComponent implements OnInit {
  @Input() ticketInfo : Ticket[];

  constructor() { }

  ngOnInit() {
  }

}
