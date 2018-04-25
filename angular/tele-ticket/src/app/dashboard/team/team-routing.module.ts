import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamComponent } from './team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamPageComponent } from './team-page/team-page.component';

import { AuthGuardService as AuthGuard } from '../../core/authentication/auth-guard.service';

const routes: Routes = [
    {
        path: '', component: TeamComponent, children: [
            {
                path: ':teamName',
                component: TeamPageComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'teamlist',
                component: TeamListComponent,
                canActivate: [AuthGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule { }
