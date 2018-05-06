import { Component, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";

import { Ticket } from "../../../models/tickets/ticket";
import { PlayLoad } from "../../../models/users/playLoad";
import { AuthService } from "../../../core/authentication/auth.service";

@Component({
    selector: 'app-ticket-page',
    templateUrl: './ticket-page.component.html',
    styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
    public ticketInfo: Ticket;
    public ticketId: number;
    public snapshot: ActivatedRouteSnapshot;
    public playLoad: PlayLoad;
    public amIGM: boolean = false;
    public amIAU: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private auth: AuthService,
    ) {
        this.snapshot = this.activatedRoute.snapshot;
    }

    ngOnInit(): void {
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
