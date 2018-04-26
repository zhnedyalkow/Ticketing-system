import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard.service';
import { Ticket } from '../../../models/tickets/ticket';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/users/user';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-team-page',
    templateUrl: './team-page.component.html',
    styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

    myTickets: Ticket[];
    usersOfTeam: User[];
    snapshot: ActivatedRouteSnapshot;
    teamName: string;

    constructor(public dashService: DashboardService, private activatedRoute: ActivatedRoute) {
        this.snapshot = this.activatedRoute.snapshot;
    }

    ngOnInit() {
        this.teamName = this.snapshot.params.teamName;
        this.getAllUsersOfTeam();
        this.getAllTicketsByTeam();
    }

    getAllTicketsByTeam() {
        this.dashService.getAllTicketsOfTeam(this.teamName).subscribe((x) => {
            this.myTickets = x;
        }, (err: HttpErrorResponse) => {
            console.log(err.error.err);
        });
    }

    getAllUsersOfTeam() {
        this.dashService.getAllUsersOfTeam(this.teamName).subscribe((x) => {
            this.usersOfTeam = x;
        }, (err: HttpErrorResponse) => {
            console.log(err.error.err);
        });
    }

}
