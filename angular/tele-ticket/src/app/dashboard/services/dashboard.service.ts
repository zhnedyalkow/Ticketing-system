import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/app.config';
import { HttpClient } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {
  constructor(private appConfig: AppConfig, private http: HttpClient) { }

  getUserInfo() : Observable<Object>{
    return this.http.get(`${this.appConfig.apiUrl}/user/getInfo`);
  }

}
