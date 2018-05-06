import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

import { RoleGuardService as RoleGuard} from '../../core/authentication/role-guard.service';

const routes: Routes = [
    {
        path: '', component: AdminComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'admin'} 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
