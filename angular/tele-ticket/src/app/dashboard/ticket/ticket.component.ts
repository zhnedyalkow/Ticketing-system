import { Component, OnInit } from '@angular/core';
import { TicketService } from '../shared/services/ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(
    public ticketService: TicketService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
}
