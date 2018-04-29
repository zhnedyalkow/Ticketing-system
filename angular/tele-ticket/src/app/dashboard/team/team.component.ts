import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../models/teams/team';
import { DashboardService } from '../shared/services/dashboard.service';


@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    constructor(private dashServise: DashboardService) { }

    ngOnInit() {
    }

}
