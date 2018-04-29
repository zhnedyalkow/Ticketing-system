import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {
    AuthGuardService as Authguard,
    AuthGuardServiceLogin as AuthGuardLogin,
} from './core/authentication/auth-guard.service';

import { NotFoundComponent } from './auth/not-found/not-found.component';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: './auth/auth.module#AuthModule',
        canActivate: [AuthGuardLogin],
    },
    {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [Authguard]
    },
    {
        path: '**', component: NotFoundComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
