import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { AppConfig } from "../../../config/app.config";

@Injectable()
export class TicketService {
    constructor(private appConfig: AppConfig, private http: HttpClient) { }

    getTicketInfoById(ticketId: number): Observable<Object> {
        return this.http.get(`${this.appConfig.apiUrl}/Ticket/getTicketInfoById?ticketId=${ticketId}`);
    }
}
