import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../../core/authentication/auth-guard.service';

import { TeamComponent } from './team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { TeamNameResolver } from '../shared/resolvers/team-name.resolver';

const routes: Routes = [
    {
        path: '', component: TeamComponent, children: [
            {
                path: 'teamlist',
                component: TeamListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':teamName',
                component: TeamPageComponent,
                canActivate: [AuthGuard],
                resolve: {
                    allTickets: TeamNameResolver
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule { }
