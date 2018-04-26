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

    ticketInfo: object;
    ticketId: number;
    snapshot: ActivatedRouteSnapshot;
    
    constructor(
        public ticketService: TicketService, 
        private activatedRoute: ActivatedRoute
    ) {
        this.snapshot = this.activatedRoute.snapshot;
     }

  ngOnInit() {
    this.ticketId = this.snapshot.params.ticketId;
    this.getTicketInfoById();
  }

  getTicketInfoById() {
    this.ticketService.getTicketInfoById(this.ticketId).subscribe((data) => {
        console.log(`Data: ${data}`);
      this.ticketInfo = data;
    }, (err: HttpErrorResponse) => {
        console.log(err.error.err);
    });
}

}
