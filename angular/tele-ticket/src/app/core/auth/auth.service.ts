import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/app.config';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { User } from '../../models/users/user';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  constructor(private appConfig: AppConfig, private jwtService: JwtHelperService) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtService.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}