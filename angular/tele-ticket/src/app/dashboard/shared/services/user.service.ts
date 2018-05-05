import { Injectable } from "@angular/core";
import { AppConfig } from "../../../config/app.config";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { UserInfo } from "../../../models/users/user.info";

@Injectable()
export class UserService {
    constructor(private appConfig: AppConfig, private http: HttpClient) { }

    public getAllUsers(): Observable<Array<UserInfo>> {
        return this.http.get<Array<UserInfo>>(`${this.appConfig.apiUrl}/user/getAllUsers`);
    }

    getAllUsersOfTeam(teamName: string): Observable<Array<Object>> {
        return this.http
            .get<Array<Object>>(`${this.appConfig
                .apiUrl}/user/getAllUsersOfTeam?team=${teamName}`);
    }
}
