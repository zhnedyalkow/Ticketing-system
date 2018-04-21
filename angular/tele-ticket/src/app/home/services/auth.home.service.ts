import { HttpOptions } from '../../models/core/http-options';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { User } from "../../models/users/user";
import { AppConfig } from '../../config/app.config';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHomeService {

    constructor(private appConfig: AppConfig, private http: HttpClient,
    private jwtService: JwtHelperService) {}

    register(user: User, options ?: HttpOptions): Observable < Object > {
        return this.http.post(`${this.appConfig.apiUrl}/register`, user);
    }

    login(user: User, options ?: HttpOptions): Observable < Object > {
        return this.http.post(`${this.appConfig.apiUrl}/user/login`, user);
    }

}

