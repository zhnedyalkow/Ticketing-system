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

@Component({
    selector: 'app-team-page',
    templateUrl: './team-page.component.html',
    styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
    public teamName: string;
    public usersOfTeam: User[];
    public myTickets: Ticket[];
    public amIGM: boolean = false;
    public amIAU: boolean = false;
    public playLoad: { id: number, role: string };
    public snapshot: ActivatedRouteSnapshot;

    constructor(
        private router: Router,
        private auth: AuthService,
        public teamService: TeamService,
        private activatedRoute: ActivatedRoute,
        private toastr: ToastrService,
        private modalService: NgbModal,
    ) {
        this.snapshot = this.activatedRoute.snapshot;
    }

    public ngOnInit(): void {
        this.playLoad = this.auth.tokenData();
        this.teamName = this.snapshot.params.teamName;

        if (this.playLoad.role == 'admin') {
            this.amIGM = true;
        }
    }
}
