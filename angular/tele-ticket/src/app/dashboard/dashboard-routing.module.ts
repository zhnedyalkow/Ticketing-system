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
            { path: 'team', loadChildren: './team/team.module#TeamModule'},
            { path: 'test', loadChildren: './test/test.module#TestModule'},
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
