import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../../core/authentication/auth-guard.service';

import { TeamComponent } from './team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamPageComponent } from './team-page/team-page.component';


const routes: Routes = [
    {
        path: '', component: TeamComponent, children: [
            {
                path: '', redirectTo: 'teamlist',
            },
            {
                path: 'teamlist',
                component: TeamListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':teamName',
                component: TeamPageComponent,
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
