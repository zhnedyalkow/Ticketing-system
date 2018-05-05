import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { TeamService } from "../services/team.service";
import { UserInfo } from "../../../models/users/user.info";

@Injectable()
export class TeamMembersResolver implements Resolve<UserInfo[]> {

    constructor(
        private teamService: TeamService,
        private router: Router
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return this.teamService.getAllUsersOfTeam(route.params['teamName'])
            .catch((err) => {
                this.router.navigate(['/not-found']);
                return Observable.empty();
            });
    };
}
