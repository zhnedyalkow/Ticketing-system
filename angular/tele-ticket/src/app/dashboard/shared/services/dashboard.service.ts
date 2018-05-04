import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../../models/teams/team';
import { AppConfig } from '../../../config/app.config';
import { Ticket } from '../../../models/tickets/ticket';
import { User } from '../../../models/users/user';
import { UserInfo } from '../../../models/users/user.info';

@Injectable()
export class DashboardService {
    userInfo: Observable<UserInfo>;

    constructor(private appConfig: AppConfig, private http: HttpClient) { 
        this.userInfo = this.http.get<UserInfo>(`${this.appConfig.apiUrl}/user/getInfo`);
    }

    public getUserInfo(): Observable<UserInfo> {
        return this.userInfo;
    }

    public getMyTeams(): Observable<Array<Team>> {
        return this.http.get<Array<Team>>(`${this.appConfig.apiUrl}/Team/getMyTeams`);
    }
}
