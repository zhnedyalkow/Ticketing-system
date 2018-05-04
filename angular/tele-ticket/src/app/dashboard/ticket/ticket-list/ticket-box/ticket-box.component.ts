import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from '../../../../models/tickets/ticket';

@Component({
    selector: 'app-ticket-box',
    templateUrl: './ticket-box.component.html',
    styleUrls: ['./ticket-box.component.scss']
})
export class TicketBoxComponent implements OnInit {

    @Input() ticket: Ticket;

    constructor() { }

    ngOnInit() {
    }

}
