import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { User } from '../../../models/users/user';
import { Ticket } from '../../../models/tickets/ticket';
import { TeamService } from '../../shared/services/team.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-team-page',
    templateUrl: './team-page.component.html',
    styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
    
    public teamName: string;
    public myTickets: Ticket[];
    public usersOfTeam: User[];
    public snapshot: ActivatedRouteSnapshot;

    constructor(
        public teamService: TeamService, 
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService
    ) {
        this.snapshot = this.activatedRoute.snapshot;
    }

    public ngOnInit(): void {
        this.teamName = this.snapshot.params.teamName;

        this.getAllUsersOfTeam();
        this.getAllTicketsByTeam();
    }

    public getAllTicketsByTeam(): void {
        this.teamService.getAllTicketsOfTeam(this.teamName).subscribe((x) => {
            this.myTickets = x;
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        });
    }

    getAllUsersOfTeam() {
        this.teamService.getAllUsersOfTeam(this.teamName).subscribe((x) => {
            this.usersOfTeam = x;
        }, (err: HttpErrorResponse) => {
            this.toastr.error(err.error.err);
        });
    }
}
