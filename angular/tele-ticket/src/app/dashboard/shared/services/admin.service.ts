import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserInfo } from '../../../models/users/user.info';

@Injectable()
export class AdminService {
    constructor(private appConfig: AppConfig, private http: HttpClient) { }

    addUserToCompany(userEmail: string): Observable<UserInfo> {
        const email = {
            email: userEmail,
        }
        return this.http.post<UserInfo>
            (`${this.appConfig.apiUrl}/user/addUserToCompany`, email);
    }
    
    getAllUsers(): Observable<Array<UserInfo>> {
        return this.http.get<Array<UserInfo>>(`${this.appConfig.apiUrl}/user/getAllUsers`);
    }
}
