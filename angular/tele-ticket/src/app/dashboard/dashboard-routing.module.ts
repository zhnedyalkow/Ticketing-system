import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamPageComponent } from './team/team-page/team-page.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { TicketPageComponent } from './ticket/ticket-page/ticket-page.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            // { path: 'team', loadChildren: './dashboard/team/team.module#TeamModule'},
            { path: 'team-list', component: TeamListComponent },
            { path: 'team-page', component: TeamPageComponent },
            { path: 'ticket-list', component: TicketListComponent },
            { path: 'create-ticket', component: CreateTicketComponent },
            { path: 'ticket-page', component: TicketPageComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
