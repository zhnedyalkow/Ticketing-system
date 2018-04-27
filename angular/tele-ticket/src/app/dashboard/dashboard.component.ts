import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { DashboardService } from './shared/services/dashboard.service';
import { Team } from '../models/teams/team';
import { UserInfo } from '../models/users/user.info';
import { AuthService } from '../core/authentication/auth.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    userInfo$: Observable<Object>;

    constructor(private router: Router, private dashService: DashboardService, private auth: AuthService) { }
    ngOnInit() {
        this.userInfo$ = this.dashService.getUserInfo();
    }

    logoutUser() {
        this.auth.logout();
        this.router.navigate(['./']);
    }
}
