import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators/catchError';
import { Observable } from "rxjs/Rx";
import { Team } from "../../../models/teams/team";
import { Ticket } from "../../../models/tickets/ticket";
import { TeamService } from "../services/team.service";

@Injectable()
export class TeamNameResolver implements Resolve<Ticket[]> {

    constructor(
        private teamService: TeamService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {

        return this.teamService.getAllTicketsOfTeam(route.params['teamName'])
            .catch((err) => {
                this.router.navigate(['/not-found']);
                return Observable.empty();
            });
    };
}