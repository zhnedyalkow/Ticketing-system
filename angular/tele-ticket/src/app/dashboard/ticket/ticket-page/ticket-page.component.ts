import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { TicketService } from '../../shared/services/ticket.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {

    ticketId: number;
    ticketInfo: object;
    snapshot: ActivatedRouteSnapshot;

  constructor(public ticketService: TicketService, private activatedRoute: ActivatedRoute) { 
    this.snapshot = this.activatedRoute.snapshot;
  }

  ngOnInit() {
    this.getTicketInfoById();
  }

  getTicketInfoById() {
      const ticketId = this.snapshot.params.ticketId;

      this.ticketService.getTicketInfoById(ticketId).subscribe((data) => {
        this.ticketInfo = data;
      }, (err: HttpErrorResponse) => {
        console.log(err.error.err);
    });
  }
}
