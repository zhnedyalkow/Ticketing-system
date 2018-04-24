import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../models/users/user.info';
import { Team } from '../models/teams/team';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from './shared/services/dashboard.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    userInfo$: Observable<Object>;

    constructor(private dashServise: DashboardService) { }
    ngOnInit() {
        
        this.userInfo$ = this.dashServise.getUserInfo();
    }

}
