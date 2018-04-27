import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { DashboardService } from './shared/services/dashboard.service';
import { Team } from '../models/teams/team';
import { UserInfo } from '../models/users/user.info';
import { AuthService } from '../core/authentication/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { TeamService } from './shared/services/team.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from 'events';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    userInfo$: Observable<Object>;
    createTeamForm: FormGroup;
    email: AbstractControl;
    name: AbstractControl;

    @Input() allTeams: Team[];

    @Output() closeModalEvent = new EventEmitter<boolean>();

    constructor(
        private router: Router,
        private dashService: DashboardService,
        private teamService: TeamService,
        private auth: AuthService,
        private fb: FormBuilder

    ) {
        this.allTeams = [];
    }
    ngOnInit() {
        this.userInfo$ = this.dashService.getUserInfo();

        this.createTeamForm = this.fb.group({
            'name': [null, Validators.minLength(2)],
            users: this.fb.array([
                this.buildItem(),
            ]),
            // 'email': [null, Validators.compose([Validators.required, Validators.email,
            // Validators.pattern("[^ @]*@[^ @]*"),
            // Validators.minLength(10), Validators.maxLength(50)])],
        });


        this.email = this.createTeamForm.controls['email'];
        this.name = this.createTeamForm.controls['name'];
    }


    createTeam() {
        this.teamService.createTeam(this.createTeamForm.value).subscribe((data: Team) => {
            // console.log(data);
            this.allTeams.push(data);
            this.router.navigate(['./dashboard/team/team-list']);
            this.createTeamForm.reset();

        }, (err: HttpErrorResponse) => {
            alert(err.error.err);
        });
    }

    createTicket() {

    }

    logoutUser() {
        this.auth.logout();
        this.router.navigate(['./']);
    }

    buildItem() {
        return new FormGroup({
            email: new FormControl('', Validators.required),
        })
    }

}
