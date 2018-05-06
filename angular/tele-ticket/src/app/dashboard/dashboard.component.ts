import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DashboardService } from './shared/services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public userInfo$: Observable<Object>;

    constructor(
        private dashService: DashboardService,
    ) {}

    ngOnInit(): void {
        this.userInfo$ = this.dashService.getUserInfo();
    }
}
