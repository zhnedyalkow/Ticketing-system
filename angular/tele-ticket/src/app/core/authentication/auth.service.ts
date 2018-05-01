import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';
import { AppConfig } from "../../config/app.config";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class AuthService {
    constructor(
        private router: Router,
        private appConfig: AppConfig,
        private jwtService: JwtHelperService,
        private toastr: ToastrService,
    ) { }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');

        return !this.jwtService.isTokenExpired(token);
    }

    tokenData() : {id: number, role: string} {
        const token = localStorage.getItem('token');
    
        // decode the tocken to get its payload
        const tokenPayload = jwt_decode(token);
    
        return tokenPayload;
      }

    public logout(): void {
        this.toastr.success(`You are logged out!`);
        localStorage.removeItem('access_token');
        localStorage.clear();
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }
}