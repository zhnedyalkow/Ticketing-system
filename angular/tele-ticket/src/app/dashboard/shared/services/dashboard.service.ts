import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Team } from '../../../models/teams/team';
import { AppConfig } from '../../../config/app.config';
import { Ticket } from '../../../models/tickets/ticket';
import { User } from '../../../models/users/user';

@Injectable()
export class DashboardService {
    constructor(private appConfig: AppConfig, private http: HttpClient) { }

    getUserInfo(): Observable<Object> {
        return this.http.get(`${this.appConfig.apiUrl}/user/getInfo`);
    }

    getMyTeams(): Observable<Array<Team>> {
        return this.http.get<Array<Team>>(`${this.appConfig.apiUrl}/Team/getMyTeams`);
    }

    getAllTicketsOfTeam(teamName: string): Observable<Array<Ticket>> {
        return this.http.get<Array<Ticket>>(`${this.appConfig.apiUrl}/Ticket/getAllTicketsOfTeam?team=${teamName}`);
    }

    getAllUsersOfTeam(teamName: string): Observable<Array<User>> {
        return this.http.get<Array<User>>(`${this.appConfig.apiUrl}/user/getAllUsersOfTeam?team=${teamName}`);
    }
}
