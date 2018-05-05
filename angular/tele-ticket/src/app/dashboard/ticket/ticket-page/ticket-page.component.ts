import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../shared/services/ticket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Comments } from '../../../models/comments/comments';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observer } from 'rxjs/Observer';
import { Observable } from "rxjs/Rx";
import { AuthService } from '../../../core/authentication/auth.service';
import { Ticket } from '../../../models/tickets/ticket';
import { Status } from '../../../models/tickets/status';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-ticket-page',
    templateUrl: './ticket-page.component.html',
    styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
    public ticketInfo: Ticket;
    public ticketId: number;
    public snapshot: ActivatedRouteSnapshot;
    public playLoad: { id: number, role: string };
    public amIGM: boolean = false;
    public amIAU: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private auth: AuthService,
    ) {
        this.snapshot = this.activatedRoute.snapshot;
    }

    public ngOnInit(): void {
        this.ticketId = this.snapshot.params.ticketId;
        this.playLoad = this.auth.tokenData();

        if (this.playLoad.role == 'admin') {
            this.amIGM = true;
        }

        this.activatedRoute.data.subscribe((data) => {
            this.ticketInfo = data.ticketInfo;

            if (this.ticketInfo.Team.TeamManagerId == this.playLoad.id) {
                this.amIGM = true;
            }

            if (this.ticketInfo.AssignedUser.id == this.playLoad.id) {
                this.amIAU = true;
            }
        });
    }
}
