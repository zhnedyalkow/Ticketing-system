import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { Observable } from 'rxjs/Observable';

import { AppConfig } from "../../config/app.config";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {
  constructor(private router: Router, private appConfig: AppConfig, private jwtService: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtService.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.clear();
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}