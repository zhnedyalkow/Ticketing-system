import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { User } from '../../../models/users/user';
import { Ticket } from '../../../models/tickets/ticket';
import { TeamService } from '../../shared/services/team.service';

@Component({
    selector: 'app-team-page',
    templateUrl: './team-page.component.html',
    styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
    
    teamName: string;
    myTickets: Ticket[];
    usersOfTeam: User[];
    snapshot: ActivatedRouteSnapshot;

    constructor(public teamService: TeamService, private activatedRoute: ActivatedRoute) {
        this.snapshot = this.activatedRoute.snapshot;
    }
    ngOnInit() {
        this.teamName = this.snapshot.params.teamName;
        this.getAllUsersOfTeam();
        this.getAllTicketsByTeam();
    }

    getAllTicketsByTeam() {
        this.teamService.getAllTicketsOfTeam(this.teamName).subscribe((x) => {
            this.myTickets = x;
        }, (err: HttpErrorResponse) => {
            console.log(err.error.err);
        });
    }

    getAllUsersOfTeam() {
        this.teamService.getAllUsersOfTeam(this.teamName).subscribe((x) => {
            this.usersOfTeam = x;
        }, (err: HttpErrorResponse) => {
            console.log(err.error.err);
        });
    }
}
