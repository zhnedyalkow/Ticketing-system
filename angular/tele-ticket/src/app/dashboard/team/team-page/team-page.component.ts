import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../models/users/user';
import { Ticket } from '../../../models/tickets/ticket';
import { TeamService } from '../../shared/services/team.service';
import { ToastrService } from 'ngx-toastr';
import { Team } from '../../../models/teams/team';
import { AuthService } from '../../../core/authentication/auth.service';
import { AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTeammemberComponent } from '../../components/add-teammember/add-teammember.component';
import { UserInfo } from '../../../models/users/user.info';
import { PlayLoad } from '../../../models/users/playLoad';

@Component({
    selector: 'app-team-page',
    templateUrl: './team-page.component.html',
    styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
    public usersOfTeam: UserInfo[];

    public teamName: string;
    public myTickets: Ticket[];
    public amIGM: boolean = false;
    public playLoad: PlayLoad;
    public snapshot: ActivatedRouteSnapshot;

    constructor(
        private auth: AuthService,
        public teamService: TeamService,
        private activatedRoute: ActivatedRoute,
    ) {
        this.snapshot = this.activatedRoute.snapshot;
    }

    ngOnInit(): void {
        this.playLoad = this.auth.tokenData();
        this.teamName = this.snapshot.params.teamName;

        this.getTeamManager();

        if (this.playLoad.role == 'admin') {
            this.amIGM = true;
        }

        this.activatedRoute.data.subscribe((data) => {
            this.myTickets = data.allTickets;
            this.usersOfTeam = data.allMembers;
        });
    }

    public getTeamManager(): void {
        this.teamService.getTeamManager(this.teamName).subscribe((user: UserInfo) => {
            if (this.playLoad.id == user.id) {
                this.amIGM = true;
            }
        });
    }
}
