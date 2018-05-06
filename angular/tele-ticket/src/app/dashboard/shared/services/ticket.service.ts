import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { AppConfig } from "../../../config/app.config";
import { Comment } from "../../../models/comments/comment";
import { Status } from "../../../models/tickets/status";
import { Ticket } from "../../../models/tickets/ticket";

@Injectable()
export class TicketService {
    constructor(private appConfig: AppConfig, private http: HttpClient) { }

    getTicketInfoById(ticketId: number): Observable<Ticket> {
        return this.http.get<Ticket>(`${this.appConfig.apiUrl}/Ticket/getTicketInfoById?ticketId=${ticketId}`);
    }

    createTicket(formsValue: Object): Observable<Ticket> {
        return this.http.post<Ticket>
            (`${this.appConfig.apiUrl}/ticket/createTicket`, formsValue
        )
    }

    deleteTicket(ticketInfo: Object): Observable<Object> {
        return this.http.post<Observable<Object>>
            (`${this.appConfig.apiUrl}/ticket/deleteTicket`, ticketInfo);
    }

    getMyTickets(): Observable<Array<Ticket>>{
        return this.http.get<Array<Ticket>>(`${this.appConfig.apiUrl}/ticket/getMyTickets`);
    }

    getComments(ticketId): Observable<Array<Comment>> {
        return this.http.get<Array<Comment>>
            (`${this.appConfig.apiUrl}/comments/getAllComments?ticketId=${ticketId}`);
    }

    addComment(formsValue: Object): Observable<Comment>{
        return this.http.post<Comment>(`${this.appConfig.apiUrl}/comments/createComment`, formsValue);
    }

    changeStatus(statusData: Status): Observable<Status> {
        return this.http.post<Status>(`${this.appConfig.apiUrl}/ticket/changeTicketStatus`, statusData);
    }
}
