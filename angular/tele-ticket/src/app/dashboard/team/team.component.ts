import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../models/teams/team';
import { DashboardService } from '../shared/services/dashboard.service';


@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    // myTeamsInfo: Team[];

    constructor(private dashServise: DashboardService) { }

    ngOnInit() {
        // this.dashServise.getMyTeams().subscribe((x) => {
        //     this.myTeamsInfo = x;
        //     console.log(this.myTeamsInfo + 'myTeamInfo');
        // }, (error) => {
        //     console.log(error);
        // });
    }

}
