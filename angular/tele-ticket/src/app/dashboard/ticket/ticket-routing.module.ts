import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../../core/authentication/auth-guard.service';

import { TicketComponent } from './ticket.component';
import { TicketPageComponent } from './ticket-page/ticket-page.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';


const routes: Routes = [
    {
        path: '', component: TicketComponent, children: [
            { 
                path: 'teamlist', 
                component: TicketListComponent, 
                canActivate: [AuthGuard]
            },
            { 
                path: ':teamName', 
                component: TicketPageComponent, 
                canActivate: [AuthGuard] 
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }