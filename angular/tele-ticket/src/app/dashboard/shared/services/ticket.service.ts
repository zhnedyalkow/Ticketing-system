import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { AppConfig } from "../../../config/app.config";
import { Comments } from "../../../models/comments/comments";
import { Status } from "../../../models/tickets/status";
import { Ticket } from "../../../models/tickets/ticket";

@Injectable()
export class TicketService {
    constructor(private appConfig: AppConfig, private http: HttpClient) { }

    getTicketInfoById(ticketId: number): Observable<Object> {
        return this.http.get(`${this.appConfig.apiUrl}/Ticket/getTicketInfoById?ticketId=${ticketId}`);
    }

    createTicket(formsValue: Object): Observable<Object> {
        return this.http.post<Observable<Object>>
            (`${this.appConfig.apiUrl}/ticket/createTicket`, formsValue
        )
    }

    deleteTicket(ticketInfo: Object): Observable<Object> {
        return this.http.post<Observable<Object>>
            (`${this.appConfig.apiUrl}/ticket/deleteTicket`, ticketInfo);
    }

    getMyTickets(): Observable<Array<Ticket>>{
        return this.http.get<Array<Ticket>>(`${this.appConfig.apiUrl}/ticket/getAllMyTickets`);
    }

    getComments(ticketId): Observable<Array<Comments>> {
        return this.http.get<Array<Comments>>
            (`${this.appConfig.apiUrl}/comments/getAllComments?ticketId=${ticketId}`);
    }

    addComment(formsValue: Object) {
        return this.http.post<Comments>(`${this.appConfig.apiUrl}/comments/createComment`, formsValue);
    }

    changeStatus(statusData: Status) {
        return this.http.post<Status>(`${this.appConfig.apiUrl}/ticket/changeTicketStatus`, statusData);
    }
}
