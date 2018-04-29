import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../models/teams/team';
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
    selector: 'app-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

    myTeamInfo: Team[];

    constructor(public dashService: DashboardService) { }

    ngOnInit() {
        this.dashService.getMyTeams().subscribe((x) => {
            this.myTeamInfo = x;
            debugger;
            console.log(this.myTeamInfo);
        }, (error) => {
            console.log(error);
        } );
    }

}
