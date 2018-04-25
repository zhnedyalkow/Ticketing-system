import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard.service';
import { Ticket } from '../../../models/tickets/ticket';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/users/user';
// import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
    selector: 'app-team-page',
    templateUrl: './team-page.component.html',
    styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

    @Input() myTickets: Ticket[];
    @Input() usersOfTeam: User[];

    constructor(public dashService: DashboardService, public route: ActivatedRouteSnapshot) { }

    ngOnInit() {
    }

    getAllTicketsByTeam() {
        this.dashService.getAllTicketsByTeam().subscribe((x) => {
            this.myTickets = x;
            console.log(x);
        }, (err: HttpErrorResponse) => {
            console.log(err.error.err);
        });
    }

    getAllUsersOfTeam() {
        this.dashService.getAllUsersOfTeam(this.route.params['TeamName']).subscribe((x) => {
            this.usersOfTeam = x;
            console.log(x);
        }, (err: HttpErrorResponse) => {
            console.log(err.error.err);
        });
    }

}
