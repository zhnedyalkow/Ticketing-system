import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../models/teams/team';
import { DashboardService } from '../../shared/services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
    myTeamInfo: Team[];

    constructor(
        private dashService: DashboardService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.dashService.getMyTeams().subscribe((data) => {
            this.myTeamInfo = data;
        }, (error) => {
            this.toastr.error(error.error.err);
        });
    }
}
