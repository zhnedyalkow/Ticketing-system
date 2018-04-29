import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Resolve,
    Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { catchError } from 'rxjs/operators/catchError';
import { Ticket } from "../../../models/tickets/ticket";
import { TicketService } from "../services/ticket.service";


@Injectable()
export class TicketIdResolver implements Resolve<Object> {
    constructor(
        private ticketService: TicketService,
        private router: Router
    ) {

    }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return this.ticketService.getTicketInfoById(route.params['ticketId'])
            .catch((err) => {
                this.router.navigate(['/not-found']);
                return Observable.empty();
            });
    };
}