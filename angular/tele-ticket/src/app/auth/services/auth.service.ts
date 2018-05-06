import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/users/user';
import { HttpOptions } from '../../models/core/http-options';
import { AppConfig } from '../../config/app.config';

@Injectable()
export class AuthHomeService {

    constructor(
        private appConfig: AppConfig,
        private http: HttpClient
    ) { }

    public register(user: User, options?: HttpOptions): Observable<Object> {
        return this.http.post(`${this.appConfig.apiUrl}/user/register`, user);
    }

    public login(user: User, options?: HttpOptions): Observable<Object> {
        return this.http.post(`${this.appConfig.apiUrl}/user/login`, user);
    }

}
