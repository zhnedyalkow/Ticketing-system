import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { TicketService } from '../../../shared/services/ticket.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../core/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from '../../../../models/tickets/ticket';
import { Status } from '../../../../models/tickets/status';
import { HttpErrorResponse } from '@angular/common/http';
import { PlayLoad } from '../../../../models/users/playLoad';

@Component({
    selector: 'app-ticket-status-btns',
    templateUrl: './ticket-status-btns.component.html',
    styleUrls: ['./ticket-status-btns.component.scss']
})
export class TicketStatusBtnsComponent implements OnInit {

    @Input() ticketInfo: Ticket;
    @Input() amIGM: boolean;
    @Input() amIAU: boolean;

    public ticketId: number;
    public snapshot: ActivatedRouteSnapshot;

    constructor(
        private router: Router,
        private toastr: ToastrService,
        public ticketService: TicketService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.snapshot = this.activatedRoute.snapshot;
    }

    public ngOnInit(): void {
        this.ticketId = this.snapshot.params.ticketId;
    }

    public changeStatus(status: string): void {
        const statusData: Status = {
            name: status,
            tickedId: this.ticketId,
        }

        this.ticketService.changeStatus(statusData).subscribe((data: Status) => {
            this.ticketInfo.Status = data;
            this.toastr.success(`Changed status: ${data.name}!`);
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.er);
        });
    }

    public deleteTicket(): void {
        const ticketForDelete = {
            ticketId: this.ticketId,
        };

        this.ticketService.deleteTicket(ticketForDelete)
            .subscribe((data: {
                success: string,
            }) => {
                this.toastr.success(`Successfully deleted ticket!`);
                this.router.navigate(['./ticket']);
            }, (err: HttpErrorResponse) => {
                this.toastr.error(err.error.err);
            })
    }
}
