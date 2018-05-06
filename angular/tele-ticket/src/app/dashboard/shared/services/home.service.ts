import { Injectable } from "@angular/core";
import { AppConfig } from "../../../config/app.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Notification } from "../../../models/notifications/notification";

@Injectable()
export class HomeService {
    constructor(private appConfig: AppConfig, private http: HttpClient) {}

    getMyNotifications(): Observable<Array<Notification>>{
        return this.http.get<Array<Notification>>(`${this.appConfig.apiUrl}/Notifications/getAllMyNotifications`);
    }
}
