import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../../core/authentication/auth-guard.service';

import { TicketComponent } from './ticket.component';
import { TicketPageComponent } from './ticket-page/ticket-page.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketIdResolver } from '../shared/resolvers/ticket-id.resolver';



const routes: Routes = [
    {
        path: '', component: TicketComponent, children: [
            { 
                path: ':ticketId', 
                component: TicketPageComponent, 
                canActivate: [AuthGuard],
                resolve: {
                    ticketId: TicketIdResolver
                }
            },
            { 
                path: 'ticketlist', 
                component: TicketListComponent, 
                canActivate: [AuthGuard]
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TicketIdResolver]
})
export class TicketRoutingModule { }