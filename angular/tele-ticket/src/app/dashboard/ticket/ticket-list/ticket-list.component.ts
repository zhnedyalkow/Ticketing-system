import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../../models/tickets/ticket';
import { TicketService } from '../../shared/services/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
    public myTicketInfo: Ticket[];

    constructor(
        private ticketService: TicketService,
        private toastr: ToastrService,
    ) { }

    ngOnInit() {
        this.getMyTickets();
    }

    public getMyTickets(): void {
        this.ticketService.getMyTickets().subscribe((data) => {
            this.myTicketInfo = data;
        }, (err) => {
            this.toastr.error(err.error.err);
        })
    }

}
