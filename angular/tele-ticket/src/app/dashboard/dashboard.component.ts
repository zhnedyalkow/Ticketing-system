import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { DashboardService } from './shared/services/dashboard.service';
import { AuthService } from '../core/authentication/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Team } from '../models/teams/team';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    userInfo$: Observable<Object>;

    constructor(
        private router: Router,
        private dashService: DashboardService,
        private auth: AuthService,

    ) {
    }
    ngOnInit() {
        this.userInfo$ = this.dashService.getUserInfo();
    }
}
