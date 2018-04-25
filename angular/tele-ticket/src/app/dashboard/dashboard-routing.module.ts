import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { AuthGuardService as AuthGuard } from '../core/authentication/auth-guard.service';
import { RoleGuardService as RoleGuard} from '../core/authentication/role-guard.service';

const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            { 
                path: 'team', 
                loadChildren: './team/team.module#TeamModule',
                canActivate: [AuthGuard]
            },
            { 
                path: 'ticket', 
                loadChildren: './ticket/ticket.module#TicketModule',
                canActivate: [AuthGuard]
            },
            { 
                path: 'admin', 
                loadChildren: './admin/admin.module#AdminModule', 
                canActivate: [RoleGuard], 
                data: { expectedRole: 'admin'} 
            },
            { 
                path: 'test', 
                loadChildren: './test/test.module#TestModule',
                canActivate: [RoleGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
